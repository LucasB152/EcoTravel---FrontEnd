import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DestinationOnMap} from '../../../core/models/DestinationOnMap';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})
export class LocationCardComponent {
  @Input() locationActivity!: DestinationOnMap;

  constructor(private router: Router) {
  }

  onContinue(id: number): void {
    this.router.navigateByUrl(`/destination/${id}`);
  }

}
