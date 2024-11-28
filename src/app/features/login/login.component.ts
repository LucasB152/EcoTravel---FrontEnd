import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(){
    if(this.loginForm.valid){
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/']);},
        error: (error) => {
          this.errorMessage = error.error;
      },
    });
    }
  }
}
