import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Itinerary} from '../../../core/models/Itinerary';
import {ItineraryService} from '../../../core/services/itinerary.service';
import {Destination} from '../../../core/models/Destination';
import {Observable, of} from 'rxjs';
import {NotificationService} from '../../../core/services/notification.service';

@Component({
  selector: 'app-itinerary-modal',
  templateUrl: './itinerary-modal.component.html',
  styleUrls: ['./itinerary-modal.component.scss'],
})
export class ItineraryModalComponent implements OnInit{
  @Input() destination: Destination | undefined = undefined;
  @Output() closeModal = new EventEmitter<void>();
  showCreateItineraryForm: boolean = false;
  newItineraryName: any;
  itineraries$: Observable<Itinerary[]> = of([]);

  constructor(private itineraryService: ItineraryService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
        this.itineraries$ = this.itineraryService.getItinerariesFromUser();
    }

  addToItinerary(itineraryId: string): void {
    console.log(`Destination ID : ${this.destination!.destinationID}`)
    this.itineraryService.addToItinerary({itineraryId: itineraryId, destinationId: this.destination!.destinationID}).subscribe()
    this.closeModal.emit();
  }

  openNewItineraryModal(): void {
    this.showCreateItineraryForm = true;
  }

  closeModalHandler(): void {
    this.closeModal.emit();
  }

  saveNewItinerary() {
    this.itineraryService.createItinerary(this.newItineraryName, this.destination!.destinationID).subscribe({
      next: result => {
        this.notificationService.showNotificationSuccess(result.Message);
        this.closeModalHandler();
      }, error: err => {
        this.notificationService.showNotificationError(err);
      }
    })
  }

  cancelCreateItinerary(): void {
    this.newItineraryName = '';
    this.showCreateItineraryForm = false;
  }
}
