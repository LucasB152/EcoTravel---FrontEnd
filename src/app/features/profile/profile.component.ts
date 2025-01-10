import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Users} from '../../core/models/Users';
import {UserService} from '../../core/services/user.service';
import {AuthService} from '../../core/services/auth.service';
import {NotificationService} from '../../core/services/notification.service';
import {Observable, of} from 'rxjs';
import {Itinerary} from '../../core/models/Itinerary';
import {ItineraryService} from '../../core/services/itinerary.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: Users;
  isModalOpen: boolean = false;
  myItinerary$: Observable<Itinerary[]> = of([]);

  constructor(private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService,
              private userService: UserService,
              private itineraryService: ItineraryService) {
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.user.profilePicturePath != null ? user.profilePicturePath : "basic-profile-picture.webp";
      }
    });
    this.myItinerary$ = this.itineraryService.getItinerariesFromUser();
  }

  openConfirmationModal() {
    this.isModalOpen = true;
  }

  deleteAccount() {
    this.userService.deleteUser().subscribe(
      response => {
        this.notificationService.showNotificationSuccess(response.Message);
      }
    )
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
