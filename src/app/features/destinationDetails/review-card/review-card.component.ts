import {Component, Input} from '@angular/core';
import {ReviewResponseDto} from '../../../core/models/ReviewResponseDto';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent {
  @Input() reviewOfDestination!: ReviewResponseDto;

  rating: number = 1;
  comment: string = 'Super service ! Les employés étaient très professionnels et sympathiques.';
  date: string = '2024-15-11';
  modified: boolean = true;
  stars = Array(5);
}
