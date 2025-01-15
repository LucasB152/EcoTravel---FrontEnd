import {Component, OnInit} from '@angular/core';
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
          }))
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
}
