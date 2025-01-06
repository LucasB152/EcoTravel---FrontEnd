import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DestinationSearch} from '../../core/models/DestinationSearch';
import {SearchResult} from '../../core/models/SearchResult';
import {SearchService} from '../../core/services/search.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {

  destinations$: Observable<DestinationSearch[]> = new Observable();
  isSearchActive: boolean = false;

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.destinations$ = this.searchService.searchDestinations('', [], '', 1, 3).pipe(
      map((results: SearchResult) => results.destinations)
    );
  }

  onSearchResults(results$: Observable<SearchResult>): void {
    this.destinations$ = results$.pipe(
      map((results: SearchResult) => results.destinations)
    );
    this.isSearchActive = true;
  }
}
