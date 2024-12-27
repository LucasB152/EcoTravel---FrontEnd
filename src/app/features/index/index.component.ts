import {Component, HostListener, OnInit} from '@angular/core';
import {Destination} from '../../core/models/Destination';
import {LocationService} from '../../core/services/location.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  destinations$!: Observable<Destination[]>;

  constructor(private destinationService: LocationService) {}

  ngOnInit(): void {
    this.destinations$ = this.destinationService.getMostPopularLocation();
  }

  /**
   * handles la recherche de destinations
   * @param results$
   */
  onSearchResults(results$: Observable<Destination[]>): void {
    this.destinations$ = results$;
  }

}
