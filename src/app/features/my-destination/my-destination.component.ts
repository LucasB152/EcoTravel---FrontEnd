import {Component, OnInit} from '@angular/core';
import {Destination} from '../../core/models/Destination';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {DestinationService} from '../../core/services/destination.service';
import {LoadingService} from '../../core/services/loading.service';
import {NotificationService} from '../../core/services/notification.service';

@Component({
  selector: 'app-destinations',
  templateUrl: 'my-destination.component.html',
  styleUrls: ['my-destination.component.scss']
})
export class MyDestinationComponent implements OnInit {
  showDeleteDestinationModal: boolean = false;
  destinations$: Observable<Destination[]> = of([]);

  constructor(private router: Router,
              private destinationService: DestinationService,
              private loadingService: LoadingService,
              private notificationService: NotificationService,
              private userService: UserService,) {
  }

  ngOnInit(): void {
    this.destinations$ = this.destinationService.getDestinationFromHost(this.userService.getUserId());
  }

  deleteDestination(id: string) {
    this.showDeleteDestinationModal = true;
  }

  closeModals() {
    this.showDeleteDestinationModal = false;
  }

  editDestination(id: string) {
    console.log('Edit destination with ID:', id);
    // Implémentez ici la logique pour modifier une destination
  }

  confirmDeleteDestination(destinationID: string) {
    this.destinations$ = this.destinationService.deleteDestination(this.userService.getUserId(), destinationID);
  }

  createNewDestination() {
    this.router.navigateByUrl('/create-destination')
  }
}
