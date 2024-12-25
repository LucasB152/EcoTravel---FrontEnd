import { Component } from '@angular/core';
import {NotificationService} from '../core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  notification$;

  constructor(private notificationService: NotificationService) {
    this.notification$ = notificationService.notification$;
  }
}
