import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReviewResponseDto} from '../../../core/models/ReviewResponseDto';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})
export class ReviewFormComponent implements OnInit {
  @Output() closeForm = new EventEmitter<any>();

  @Input() reviewOfDestination!: ReviewResponseDto;

  stars = Array(5);
  rating: number = 0;
  comment: string = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.reviewOfDestination) {
      console.log('reviewOfDestination: ', this.reviewOfDestination);
      this.rating = this.reviewOfDestination.score;
      this.comment = this.reviewOfDestination.comment;
    }
  }

  submitReview() {
    this.closeForm.emit({rating: this.rating, comment: this.comment, isSubmit: true});
  }

  cancel() {
    this.closeForm.emit({isSubmit: false});
  }

}
