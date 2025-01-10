import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../core/services/notification.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss'
})
export class EmailVerificationComponent implements OnInit {

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.verifyEmail(token).subscribe({
          next: (result) => {
            this.notificationService.showNotificationSuccess(result.Message);
            this.router.navigateByUrl("/login");
          },
          error: () => {
            this.notificationService.showNotificationError("Erreur lors de la vérification de l'adresse email");
            this.router.navigateByUrl("/");
          }
        });
      }else{
        this.notificationService.showNotificationError("Token manquant");
        this.router.navigateByUrl("/");
      }
    })
  }

}
