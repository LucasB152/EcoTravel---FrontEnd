import {Component, OnInit, signal} from '@angular/core';
import {LocationService} from '../../../core/services/location.service';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable, shareReplay, switchMap} from 'rxjs';
import {Destination} from '../../../core/models/Destination';
import {ReviewService} from '../../../core/services/review.service';
import {ReviewResponseDto} from '../../../core/models/ReviewResponseDto';
import {map} from 'rxjs/operators';
import {ReviewEditDto} from '../../../core/models/ReviewEditDto';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrl: './destination-details.component.scss'
})
export class DestinationDetailsComponent implements OnInit {
  destination$!: Observable<Destination>;
  markerPosition$!: Observable<google.maps.LatLngLiteral>;
  reviews$!: Observable<ReviewResponseDto[]>;
  myReview$!: Observable<ReviewResponseDto>;
  averageRating$!: Observable<number>;
  isReviewFormVisible: boolean = false;
  myId: string | undefined;
  isItineraryModalVisible: boolean = false;
  selectedDestination: Destination | null = null;
  center = signal<google.maps.LatLngLiteral>({lat: 50.636, lng: 5.573});
  zoom = signal(8);

  private reviewsSubject = new BehaviorSubject<void>(undefined); // Permet de rafraîchir les données de revues.


  constructor(public route: ActivatedRoute,
              private locationService: LocationService,
              private reviewService: ReviewService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const destinationId = this.route.snapshot.params['id'];
    this.myId = this.userService.getUserId();

    this.destination$ = this.locationService.getDestinationDetails(destinationId).pipe(shareReplay(1));

    this.markerPosition$ = this.destination$.pipe(
      map((destination) => ({
        lat: destination.latitude,
        lng: destination.longitude
      }))
    );

    this.reviews$ = this.reviewsSubject.pipe(
      switchMap(() => this.reviewService.getReviews(destinationId)),
      shareReplay(1)
    );

    this.myReview$ = this.reviews$.pipe(
      map(reviews => reviews.find(review => review.userId === this.myId) || this.createDefaultReview())
    );

    this.averageRating$ = this.reviews$.pipe(
      map(reviews => {
        const total = reviews.reduce((sum, review) => sum + review.score, 0);
        return reviews.length > 0 ? total / reviews.length : 0;
      })
    );

  }

  toggleReviewForm(event: any): void {
    if (event.isSubmit) {
      const destinationId = this.route.snapshot.params['id'];

      if (event.id === 0) {
        const reviewCreationDto = {
          score: event.score,
          comment: event.comment,
          userId: event.userId,
          destinationId
        };

        this.reviewService.createReview(reviewCreationDto).subscribe(() => {
          this.reviewsSubject.next(); // Rafraîchir les revues après la création.
        });
      } else {
        const reviewEditDto: ReviewEditDto = {
          id: event.id,
          score: event.score,
          comment: event.comment
        };

        this.reviewService.updateReview(reviewEditDto).subscribe(() => {
          this.reviewsSubject.next(); // Rafraîchir les revues après la mise à jour.
        });
      }
    }

    this.isReviewFormVisible = !this.isReviewFormVisible;
  }

  showReviewForm(): void {
    this.isReviewFormVisible = true;
  }


  openItineraryModal(destination: Destination): void {
    this.selectedDestination = destination;
    this.isItineraryModalVisible = true;
  }

  closeItineraryModal(): void {
    this.isItineraryModalVisible = false;
    this.selectedDestination = null;
  }

  private createDefaultReview(): ReviewResponseDto {
    return {
      id: 0,
      score: 1,
      comment: '',
      edited: false,
      userId: this.myId!,
      username: '',
      dateStringCreation: '',
      dateStringModification: ''
    };
  }

}
