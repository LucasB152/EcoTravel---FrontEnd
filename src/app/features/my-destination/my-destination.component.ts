import {Component, OnInit} from '@angular/core';
import {Destination} from '../../core/models/Destination';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {DestinationService} from '../../core/services/destination.service';
import {LoadingService} from '../../core/services/loading.service';
import {NotificationService} from '../../core/services/notification.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-destinations',
  templateUrl: 'my-destination.component.html',
  styleUrls: ['my-destination.component.scss']
})
export class MyDestinationComponent implements OnInit {
  showDeleteDestinationModal: boolean = false;
  destinations$: Observable<Destination[]> = of([]);
  destinationId: string = "";

  constructor(private router: Router,
              private destinationService: DestinationService,
              private loadingService: LoadingService,
              private notificationService: NotificationService,
              private userService: UserService,) {
  }

  ngOnInit(): void {
    this.destinations$ = this.destinationService.getDestinationFromHost(this.userService.getUserId());
  }

  openModalDeletion(destinationId: string) {
    this.showDeleteDestinationModal = true;
    this.destinationId = destinationId;
    console.log(`id : ${this.destinationId}`);
  }

  closeModals() {
    this.showDeleteDestinationModal = false;
  }

  editDestination(destinationId: string) {
    const dataToSend = { destinationId: destinationId };
    this.router.navigate([`/modify-destination`], { state: dataToSend });
  }

  deleteDestination() {
    this.destinations$ = this.destinationService.deleteDestination(this.userService.getUserId(), this.destinationId);
    this.closeModals();
  }

  createNewDestination() {
    this.router.navigateByUrl('/create-destination')
  }
}
