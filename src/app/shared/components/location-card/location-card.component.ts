import {Component, Input, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {DestinationSearch} from '../../../core/models/DestinationSearch';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})
export class LocationCardComponent implements OnChanges {
  @Input() locationActivity!: DestinationSearch;

  constructor(private router: Router) {
  }

  ngOnChanges(): void {
    console.log('Received locationActivity:', this.locationActivity); // Debug log
  }

  onContinue(id: number): void {
    this.router.navigateByUrl(`/destination/${id}`);
  }

}
