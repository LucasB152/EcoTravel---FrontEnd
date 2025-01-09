import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-itinerary-modal',
  templateUrl: './itinerary-modal.component.html',
  styleUrls: ['./itinerary-modal.component.scss'],
})
export class ItineraryModalComponent {
  @Input() destination: any;
  @Input() itineraries: { id: string; name: string }[] = [];
  @Output() closeModal = new EventEmitter<void>();

  addToItinerary(itineraryId: string): void {
    console.log(`Destination "${this.destination.name}" ajoutée à l'itinéraire ${itineraryId}`);
    this.closeModal.emit();
  }

  createNewItinerary(): void {
    console.log('Créer un nouvel itinéraire');
    // Logique pour créer un nouvel itinéraire
    this.closeModal.emit();
  }

  closeModalHandler(): void {
    this.closeModal.emit();
  }
}
