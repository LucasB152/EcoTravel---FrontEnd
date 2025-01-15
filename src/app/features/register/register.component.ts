import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Users} from '../../core/models/Users';
import {NotificationService} from '../../core/services/notification.service';
import {Router} from '@angular/router';
import {LoadingService} from '../../core/services/loading.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router,
              private loadingService: LoadingService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
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
    this.loadingService.show();
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value)
        .pipe(finalize(() => {
          this.loadingService.hide();
        })).subscribe({
        next: (response) => {
          this.router.navigateByUrl("/");
          this.notificationService.showNotificationSuccess(response.Message);
        },
        error: (error) => {
          this.notificationService.showNotificationError(error.error.message);
        }
      })
    }
  }
}
