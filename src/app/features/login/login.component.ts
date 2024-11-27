import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {TokenService} from '../../core/services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService, private router: Router) {
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
        console.log('Login successful:', response);
        this.tokenService.saveToken(response.token);
        this.router.navigate(['/profile']); },
        error: (err) => {
        console.error('Login failed:', err);
      },
    });
    }
  }
}
