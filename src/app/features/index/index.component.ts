import {Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs';
import {DestinationSearch} from '../../core/models/DestinationSearch';
import {SearchResult} from '../../core/models/SearchResult';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {

  destinations: DestinationSearch[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  onSearchResults(results$: Observable<SearchResult>): void {
    results$.subscribe((results) => {
      this.destinations = results.destinations;
    });
  }
}
