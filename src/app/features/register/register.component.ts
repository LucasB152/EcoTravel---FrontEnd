import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Users} from '../../core/models/Users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required]],
      terms: ['', [Validators.required]],
    },{
      validators: this.confirmationMatchPassword
    });
  }

  confirmationMatchPassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');
    if (password && passwordConfirmation && password.value !== passwordConfirmation.value) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.successMessage = response.Message;
        },
        error: (error) => {
          this.errorMessage = error.error;
        }
      })
    }
  }
}
