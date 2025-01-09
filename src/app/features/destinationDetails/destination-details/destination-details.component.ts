import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../../core/services/location.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
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
  reviews$!: Observable<ReviewResponseDto[]>;
  myReview$!: Observable<ReviewResponseDto>;
  isReviewFormVisible: boolean = false;
  isItineraryModalVisible: boolean = false;
  selectedDestination: any;

  constructor(public route: ActivatedRoute,
              private location: LocationService,
              private reviewService: ReviewService,
              private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    const destinationId: number = this.route.snapshot.params['id'];
    this.destination$ = this.location.getDestinationDetails(destinationId);
    this.reviews$ = this.reviewService.getReviews(destinationId);
    this.myReview$ = this.reviews$.pipe(
      //todo: ne pas prendre le premier mais plus celui qui a le meme userId que le user connecté
      map(reviews => reviews[0] || this.createEmptyReview())
    );
    console.log(`Id : ${this.userService.getUserId()}`)
  }


  toggleReviewForm(event: any) {
    if (event.isSubmit) {
      if (event.id === 0) {
        const reviewCreationDto = {
          score: event.score,
          comment: event.comment,
          userId: event.userId,
          destinationId: this.route.snapshot.params['id']
        };
        this.reviewService.createReview(reviewCreationDto).subscribe(() => {
        });
      } else {
        const reviewEditDto: ReviewEditDto = {
          id: event.id,
          score: event.score,
          comment: event.comment
        };
        this.reviewService.updateReview(reviewEditDto).subscribe(() => {
        });
      }
    }
    this.isReviewFormVisible = !this.isReviewFormVisible;
  }

  protected createEmptyReview(): ReviewResponseDto {
    return {
      id: 0,
      score: 1,
      comment: '',
      edited: false,
      userId: 0,
      username: '',
      dateStringCreation: '',
      dateStringModification: ''
    };
  }

  openItineraryModal(destination: any): void {
    this.selectedDestination = destination;
    this.isItineraryModalVisible = true;
  }

  closeItineraryModal(): void {
    this.isItineraryModalVisible = false;
    this.selectedDestination = null;
  }

}
