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
import {RequestService} from '../../core/services/request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: Users;
  isModalOpen: boolean = false;
  myItinerary$: Observable<Itinerary[]> = of([]);
  status: string = "";

  constructor(private router: Router,
              private authService: AuthService,
              private notificationService: NotificationService,
              private userService: UserService,
              private itineraryService: ItineraryService,
              private loadingService: LoadingService,
              private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.loadingService.show();
    this.userService.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.user.profilePicturePath != null ? user.profilePicturePath : "basic-profile-picture.webp";
      }
    });
    this.requestService.getRequestStatusFromUser(this.userService.getUserId()).subscribe(status => {
      this.status = status;
    })
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
    const dataToSend = { itineraryId: itineraryId };
    this.router.navigateByUrl(`/itinerary/${itineraryId}`, { state: dataToSend });
  }
}
