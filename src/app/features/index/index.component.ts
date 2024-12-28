import {Component, OnInit} from '@angular/core';
import {Destination} from '../../core/models/Destination';
import {LocationService} from '../../core/services/location.service';
import {forkJoin, Observable, switchMap} from 'rxjs';
import {DestinationId} from '../../core/models/DestinationId';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  destinations$!: Observable<Destination[]>;

  constructor(private destinationService: LocationService) {
  }

  ngOnInit(): void {
  }

  onSearchResults(results$: Observable<DestinationId[]>): void {
    this.destinations$ = results$.pipe(
      switchMap((destinationIds: DestinationId[]) => {
        const destinationDetails$ = destinationIds.map((destinationId: DestinationId) =>
          this.destinationService.getDestinationDetails(destinationId.destinationID)
        );
        return forkJoin(destinationDetails$);
      })
    );
  }
}
