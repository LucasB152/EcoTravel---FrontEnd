import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../../core/services/location.service';
import {ActivatedRoute} from '@angular/router';
import {Observable, shareReplay} from 'rxjs';
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
  isReviewFormVisible: boolean = false;
  myId: string | undefined;
  reviewResponseDto!: ReviewResponseDto;

  constructor(public route: ActivatedRoute,
              private location: LocationService,
              private reviewService: ReviewService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const destinationId: number = this.route.snapshot.params['id'];
    this.destination$ = this.location.getDestinationDetails(destinationId);
    this.reviews$ = this.reviewService.getReviews(destinationId).pipe(shareReplay(1));
    this.myId = this.userService.getUserId();
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
          this.reviews$ = this.reviewService.getReviews(this.route.snapshot.params['id']).pipe(shareReplay(1));
        });
      } else {
        const reviewEditDto: ReviewEditDto = {
          id: event.id,
          score: event.score,
          comment: event.comment
        };
        this.reviewService.updateReview(reviewEditDto).subscribe(() => {
          this.reviews$ = this.reviewService.getReviews(this.route.snapshot.params['id']).pipe(shareReplay(1));
        });
      }
    }
    this.isReviewFormVisible = !this.isReviewFormVisible;
  }

  showReviewForm() {
    this.isReviewFormVisible = true;
    this.createMyReview().subscribe(reviewResponseDto => {
      this.reviewResponseDto = reviewResponseDto;
    });
  }

  createMyReview(): Observable<ReviewResponseDto> {
    return this.reviews$.pipe(
      map(reviews => {
        return reviews.find(review => review.userId === this.myId) || {
          id: 0,
          score: 1,
          comment: '',
          edited: false,
          userId: this.userService.getUserId(),
          username: '',
          dateStringCreation: '',
          dateStringModification: ''
        }
      })
    );
  }

}
