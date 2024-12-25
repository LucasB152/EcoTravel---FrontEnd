import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
    type: 'success' | 'error';
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private notificationSubject = new BehaviorSubject<Notification | null>(null);
    notification$ = this.notificationSubject.asObservable();

    showNotificationSuccess(message: string) {
        this.notificationSubject.next({ type: 'success', message });

        setTimeout(() => this.clearNotification(), 5000);
    }

    showNotificationError(message: string) {
        this.notificationSubject.next({ type: 'error', message });

        setTimeout(() => this.clearNotification(), 5000);
    }

    clearNotification() {
        this.notificationSubject.next(null);
    }
}
