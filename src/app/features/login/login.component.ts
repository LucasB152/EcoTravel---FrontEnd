import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private notificationService: NotificationService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const {email, password, remember} = this.loginForm.value;
      this.authService.login(email, password, remember).subscribe({
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
