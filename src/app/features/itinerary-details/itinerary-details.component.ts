import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-itinerary-details',
  templateUrl: './itinerary-details.component.html',
  styleUrls: ['./itinerary-details.component.scss'],
})
export class ItineraryDetailsComponent {
  itinerary = {
    "id": "72e4a604-eeb4-4c39-a036-2355327cf528",
    "title": "Test 2",
    "steps": [
      {
        "id": "1617121c-c596-4fad-adf1-c7437cea6a86",
        "orderSequence": 1,
        "destination": {
          "id": "26f993e4-c515-11ef-8468-00505689127d",
          "name": "kabane7",
          "destinationType": {
            "id": 1,
            "type": "LODGING"
          },
          "address": {
            "id": "26b1eaa4-c515-11ef-8468-00505689127d",
            "country": "Belgium",
            "location": "Sprimont",
            "street": "Rue du Hollu",
            "number": "64",
            "zipcode": "4798",
            "longitude": 5.6388344,
            "latitude": 50.4820702
          }
        }
      }
    ],
    "distance": 0
  };

  //Map state
  center = signal<google.maps.LatLngLiteral>({
    lat: this.itinerary.steps.length > 0 ? this.itinerary.steps[0].destination.address.latitude : 50.636,
    lng: this.itinerary.steps.length > 0 ? this.itinerary.steps[0].destination.address.longitude : 5.573
  });
  zoom = signal(8);


  // Modals state
  showDeleteItineraryModal = false;
  showDeleteStepModal = false;
  showEditTitleModal = false;

  selectedStepIndex: number | null = null;
  newTitle = '';

  // Actions
  openDeleteItineraryModal() {
    this.showDeleteItineraryModal = true;
  }

  confirmDeleteItinerary() {
    alert('Itinéraire supprimé');
    this.showDeleteItineraryModal = false;
  }

  openDeleteStepModal(index: number) {
    this.selectedStepIndex = index;
    this.showDeleteStepModal = true;
  }

  confirmDeleteStep() {
    if (this.selectedStepIndex !== null) {
      this.itinerary.steps.splice(this.selectedStepIndex, 1);
      alert('Étape supprimée');
    }
    this.showDeleteStepModal = false;
  }

  openEditTitleModal() {
    this.newTitle = this.itinerary.title;
    this.showEditTitleModal = true;
  }

  confirmEditTitle() {
    this.itinerary.title = this.newTitle;
    alert('Titre modifié');
    this.showEditTitleModal = false;
  }

  closeModals() {
    this.showDeleteItineraryModal = false;
    this.showDeleteStepModal = false;
    this.showEditTitleModal = false;
  }

  moveStepUp(i: number) {

  }

  moveStepDown(i: number) {

  }

  goToDestination(id: string) {

  }


  createBluePin(step: any): HTMLElement {
    const pin = document.createElement('div');
    pin.style.width = '30px';
    pin.style.height = '30px';
    pin.style.backgroundColor = `rgb(${step.orderSequence * 40}, ${255 - step.orderSequence * 30}, 0)`;
    pin.style.border = '2px solid #FFFFFF';
    pin.style.borderRadius = '50%';
    pin.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';

    const glyph = document.createElement('div');
    glyph.textContent = step.orderSequence.toString();
    glyph.style.color = '#FFFFFF';
    glyph.style.fontSize = '16px';
    glyph.style.fontWeight = 'bold';
    glyph.style.display = 'flex';
    glyph.style.alignItems = 'center';
    glyph.style.justifyContent = 'center';
    glyph.style.height = '100%';

    pin.appendChild(glyph);
    return pin;
  }

}
