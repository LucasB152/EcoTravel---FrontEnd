import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../core/services/notification.service';
import {finalize} from 'rxjs';
import {LoadingService} from '../../core/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService,
              private loadingService: LoadingService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    this.loadingService.show();
    if (this.loginForm.valid) {
      const {email, password} = this.loginForm.value;
      this.authService.login(email, password).pipe(finalize(() => {
        this.loadingService.hide();
      })).subscribe({
        next: () => {
          this.router.navigateByUrl('/');
        },
        error: (error) => {
          this.notificationService.showNotificationError(error.error.message);
        },
      });
    }
  }
}
