import { Component } from '@angular/core';

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
}
