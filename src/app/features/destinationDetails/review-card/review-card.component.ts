import {Component, Input} from '@angular/core';
import {ReviewResponseDto} from '../../../core/models/ReviewResponseDto';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})

export class ReviewCardComponent {
  @Input() reviewOfDestination!: ReviewResponseDto;
  stars = Array(5);
}
