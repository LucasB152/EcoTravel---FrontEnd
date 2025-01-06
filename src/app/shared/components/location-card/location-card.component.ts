import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Destination} from '../../../core/models/Destination';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})
export class LocationCardComponent {
  @Input() locationActivity!: Destination;

  constructor(private router: Router) {
  }

  onContinue(id: number): void {
    this.router.navigateByUrl(`/destination/${id}`);
  }

}
