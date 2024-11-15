import {Component, OnInit} from '@angular/core';
import {LocationService} from '../../../core/services/location.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Destination} from '../../../core/models/Destination';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrl: './destination-details.component.scss'
})
export class DestinationDetailsComponent implements OnInit {
  destination$!: Observable<Destination>;

  constructor(public route: ActivatedRoute, public location: LocationService) {

  }

  ngOnInit(): void {
        const destinationId: number = this.route.snapshot.params['id'];
        this.destination$ = this.location.getDestinationDetails(destinationId);
    }
}
