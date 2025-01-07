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
  id: number = 0;
  score: number = 0;
  comment: string = '';
  userId: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    if (this.reviewOfDestination) {
      this.id = this.reviewOfDestination.id;
      this.score = this.reviewOfDestination.score;
      this.comment = this.reviewOfDestination.comment;
      this.userId = this.reviewOfDestination.userId;

    }
  }

  submitReview() {
    this.closeForm.emit({id: this.id, score: this.score, comment: this.comment,userId: this.userId ,isSubmit: true});
  }

  cancel() {
    this.closeForm.emit({isSubmit: false});
  }

}
