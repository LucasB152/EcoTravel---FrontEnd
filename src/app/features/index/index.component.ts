import {Component, OnInit} from '@angular/core';
import {Destination} from '../../core/models/Destination';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {

  destinations: Destination[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * handles la recherche de destinations
   * @param results les résultats de la recherche
   */
  onSearchResults(results: Destination[]): void {
    this.destinations = results;
  }


}
