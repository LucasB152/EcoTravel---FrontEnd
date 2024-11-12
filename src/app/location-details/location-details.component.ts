import {Component, OnInit} from '@angular/core';
import {LocationService} from '../core/services/location.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.scss'
})
export class LocationDetailsComponent implements OnInit {
  constructor(public route: ActivatedRoute, public location: LocationService) {

  }

  ngOnInit(): void {
        const locationId = this.route.snapshot.params['id'];
        console.log(locationId);
    }
}
