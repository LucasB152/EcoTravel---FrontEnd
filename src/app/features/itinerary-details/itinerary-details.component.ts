import {Component, OnInit, signal} from '@angular/core';
import {finalize, Observable} from 'rxjs';
import {Itinerary} from '../../core/models/Itinerary';
import {ItineraryService} from '../../core/services/itinerary.service';
import {LoadingService} from '../../core/services/loading.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../core/services/notification.service';

@Component({
  selector: 'app-itinerary-details',
  templateUrl: './itinerary-details.component.html',
  styleUrls: ['./itinerary-details.component.scss'],
})
export class ItineraryDetailsComponent implements OnInit {
  itineraryId!: string;
  itinerary$: Observable<Itinerary> | undefined;

  center = signal<google.maps.LatLngLiteral>({
    lat: 50.636,
    lng: 5.573
  });
  zoom = signal(8);


  showDeleteItineraryModal = false;
  showDeleteStepModal = false;
  showEditTitleModal = false;

  selectedStepId: string | null = null;
  newTitle = '';

  constructor(private itineraryService: ItineraryService,
              private loadingService: LoadingService,
              private router: Router,
              private notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.loadingService.show();
    this.itineraryId = history.state.itineraryId;
    this.itinerary$ = this.itineraryService.getItinerary(this.itineraryId)
      .pipe(finalize(() => {
        this.loadingService.hide();
      }))
  }


  openDeleteItineraryModal() {
    this.showDeleteItineraryModal = true;
  }

  confirmDeleteItinerary() {
    this.itineraryService.deleteItinerary(this.itineraryId);
    this.showDeleteItineraryModal = false;
    this.router.navigateByUrl("/profile");
  }

  openDeleteStepModal(stepId
                        :
                        string
  ) {
    this.selectedStepId = stepId;
    this.showDeleteStepModal = true;
  }

  confirmDeleteStep() {
    this.itinerary$ = this.itineraryService.deleteStepFromItinerary(this.itineraryId, this.selectedStepId!);
    this.closeModals();
  }

  openEditTitleModal() {
    this.showEditTitleModal = true;
  }

  confirmEditTitle() {
    if (this.newTitle.trim()) {
      this.itinerary$ = this.itineraryService.changeItineraryName(this.itineraryId, this.newTitle);
    } else {
      this.notificationService.showNotificationError("Le nom de l'itinéraire ne peut pas être vide");
    }
    this.closeModals();
  }

  closeModals() {
    this.showDeleteItineraryModal = false;
    this.showDeleteStepModal = false;
    this.showEditTitleModal = false;
  }

  moveStepUp(stepId
               :
               string
  ) {
    this.itinerary$ = this.itineraryService.moveStepUp(stepId, this.itineraryId);
  }

  moveStepDown(stepId
                 :
                 string
  ) {
    this.itinerary$ = this.itineraryService.moveStepDown(stepId, this.itineraryId);
  }

  goToDestination(id
                    :
                    string
  ) {
    this.router.navigateByUrl(`/destination/${id}`);
  }


  createBluePin(step
                  :
                  any
  ):
    HTMLElement {
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
