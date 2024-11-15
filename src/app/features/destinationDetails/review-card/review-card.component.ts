import { Component } from '@angular/core';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent {
  rating: number = 1;
  comment: string = 'Super service ! Les employés étaient très professionnels et sympathiques.';
  date: string = '2024-15-11';
  modified: boolean = true;
  stars = Array(5);
}
