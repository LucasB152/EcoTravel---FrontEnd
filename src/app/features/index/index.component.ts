import {Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs';
import {DestinationSearch} from '../../core/models/DestinationSearch';
import {SearchResult} from '../../core/models/SearchResult';
import {SearchService} from '../../core/services/search.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {

  destinations: DestinationSearch[] = [];
  isSearchActive: boolean = false;

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {

    const results$ = this.searchService.searchDestinations('', [], '', 1, 3);
    results$.subscribe((results) => {
      this.destinations = results.destinations;
    });
  }

  onSearchResults(results$: Observable<SearchResult>): void {
    results$.subscribe((results) => {
      this.destinations = results.destinations;
      this.isSearchActive = true;
    });
  }
}
