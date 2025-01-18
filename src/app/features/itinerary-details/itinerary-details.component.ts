import {Component, OnInit, signal, viewChild} from '@angular/core';
import {finalize, Observable} from 'rxjs';
import {Itinerary} from '../../core/models/Itinerary';
import {ItineraryService} from '../../core/services/itinerary.service';
import {LoadingService} from '../../core/services/loading.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../core/services/notification.service';
import {MapAdvancedMarker, MapInfoWindow} from '@angular/google-maps';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-itinerary-details',
  templateUrl: './itinerary-details.component.html',
  styleUrls: ['./itinerary-details.component.scss'],
})
export class ItineraryDetailsComponent implements OnInit {
  itineraryId!: string;
  itinerary$: Observable<Itinerary> | undefined;


  // Map state
  center = signal<google.maps.LatLngLiteral>({ lat: 50.636, lng: 5.573 });
  zoom = signal(8);
  infoWindowRef = viewChild.required(MapInfoWindow);


  // Modals state
  showDeleteItineraryModal = false;
  showDeleteStepModal = false;
  showEditTitleModal = false;

  selectedStepId: string | null = null;
  newTitle = '';

  constructor(private itineraryService: ItineraryService,
              private loadingService: LoadingService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.loadingService.show();

    this.activatedRoute.paramMap.subscribe((params) => {
      this.itineraryId = params.get('id')!;
      if (this.itineraryId != null) {
        this.itinerary$ = this.itineraryService.getItinerary(this.itineraryId)
          .pipe(finalize(() => {
            this.loadingService.hide();
          }));

        this.itinerary$
          .pipe(
            map((itinerary) => {
              const firstStep = itinerary.steps[0];
              return {
                lat: firstStep?.destination.address.latitude || 50.636,
                lng: firstStep?.destination.address.longitude || 5.573
              };
            })
          )
          .subscribe((position) => {
            this.center.set(position);
          });
      }
    });
  }

  openDeleteItineraryModal() {
    this.showDeleteItineraryModal = true;
  }

  confirmDeleteItinerary() {
    this.itineraryService.deleteItinerary(this.itineraryId);
    this.showDeleteItineraryModal = false;
    this.router.navigateByUrl("/profile");
  }

  openDeleteStepModal(stepId: string) {
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

  moveStepUp(stepId: string) {
    this.itinerary$ = this.itineraryService.moveStepUp(stepId, this.itineraryId);
  }

  moveStepDown(stepId: string) {
    this.itinerary$ = this.itineraryService.moveStepDown(stepId, this.itineraryId);
  }

  goToDestination(id: string) {
    this.router.navigateByUrl(`/destination/${id}`);
  }


  // Map Methods
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

  onMarkerClick(step: any, marker: MapAdvancedMarker): void {
    const content = `
      <div class="p-2 h-full">
        <p class="text-gray-600 text-sm">
${step.destination.address.street}
${step.destination.address.number},
${step.destination.address.zipcode}
${step.destination.address.location},
${step.destination.address.country}</p>
    </div>
  `;
    this.infoWindowRef().open(marker, false, content);
  }

}
