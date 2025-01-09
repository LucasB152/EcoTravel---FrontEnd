import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Itinerary} from '../../../core/models/Itinerary';
import {ItineraryService} from '../../../core/services/itinerary.service';
import {Destination} from '../../../core/models/Destination';
import {Observable, of} from 'rxjs';

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

  constructor(private itineraryService: ItineraryService) {
  }

  ngOnInit(): void {
        this.itineraries$ = this.itineraryService.getItinerariesFromUser();
    }

  addToItinerary(itineraryId: string): void {
    console.log(`Destination "${this.destination!.name}" ajoutée à l'itinéraire ${itineraryId}`);
    this.closeModal.emit();
  }

  createNewItinerary(): void {
    console.log('Créer un nouvel itinéraire');
    this.showCreateItineraryForm = true;
  }

  closeModalHandler(): void {
    this.closeModal.emit();
  }

  saveNewItinerary() {
    this.itineraryService.createItinerary(this.newItineraryName, this.destination!.destinationID).subscribe()
  }

  cancelCreateItinerary(): void {
    this.newItineraryName = '';
    this.showCreateItineraryForm = false;
  }
}
