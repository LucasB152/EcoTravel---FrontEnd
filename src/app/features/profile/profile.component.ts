import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Users} from '../../core/models/Users';
import {UserService} from '../../core/services/user.service';
import {AuthService} from '../../core/services/auth.service';
import {NotificationService} from '../../core/services/notification.service';
import {finalize, Observable, of} from 'rxjs';
import {Itinerary} from '../../core/models/Itinerary';
import {ItineraryService} from '../../core/services/itinerary.service';
import {LoadingService} from '../../core/services/loading.service';
import {HttpClient} from '@angular/common/http';

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
              private itineraryService: ItineraryService,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.userService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.user.profilePicturePath != null ? user.profilePicturePath : "basic-profile-picture.webp";
      }
    });
    this.myItinerary$ = this.itineraryService.getItinerariesFromUser().pipe(finalize(() => {
      this.loadingService.hide();
    }));
  }

  openConfirmationModal() {
    this.isModalOpen = true;
  }

  deleteAccount() {
    this.loadingService.show();
    this.userService.deleteUser().pipe(finalize(() => {
      this.loadingService.hide();
    })).subscribe(
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

  onSeeItineraryDetails(itineraryId: string){
    this.router.navigateByUrl(`/itinerary/${itineraryId}`);
  }
}
