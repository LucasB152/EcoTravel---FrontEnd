import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../../core/services/location.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Destination} from '../../../core/models/Destination';
import {ReviewService} from '../../../core/services/review.service';
import {ReviewResponseDto} from '../../../core/models/ReviewResponseDto';
import {map} from 'rxjs/operators';

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

  constructor(public route: ActivatedRoute,
              private location: LocationService,
              private reviewService: ReviewService
  ) {
  }

  ngOnInit(): void {
    const destinationId: number = this.route.snapshot.params['id'];
    this.destination$ = this.location.getDestinationDetails(destinationId);
    this.reviews$ = this.reviewService.getReviews(destinationId);
    this.myReview$ = this.reviews$.pipe(
      map(reviews => reviews[0] || this.createEmptyReview())
    );
  }

  toggleReviewForm(): void {
    this.isReviewFormVisible = !this.isReviewFormVisible;
  }

  protected createEmptyReview(): ReviewResponseDto {
    return {
      id: 0,
      score: 1,
      comment: '',
      edited: false,
      username: '',
      dateStringCreation: '',
      dateStringModification: ''
    };
  }

}
