import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from './services/notification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(cloned).pipe(
        catchError((error) => {
          if(error.status === 403 || error.status === 401) {
            sessionStorage.clear();
            this.authService.logout();
            this.router.navigateByUrl("/login");
            this.notificationService.showNotificationError("Session expired");
          }
          return next.handle(req);
        })
      );
    }
    return next.handle(req);
  }
}
