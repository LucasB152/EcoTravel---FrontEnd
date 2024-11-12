import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {LocationActivity} from '../../../core/models/LocationActivity';
import {LocationService} from '../../../core/services/location.service';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss'
})
export class CardsListComponent implements OnInit {
  locationActivities$!: Observable<LocationActivity[]>;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
        this.locationActivities$ = this.locationService.getMostPopularLocation();
    }
}
