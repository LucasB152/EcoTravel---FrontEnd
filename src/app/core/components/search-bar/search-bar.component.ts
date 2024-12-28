import {Component, EventEmitter, Output} from '@angular/core';
import {SearchCriteria} from '../../models/search-criteria.interface';
import {SearchService} from '../../services/search.service';
import {Destination} from '../../models/Destination';
import {Observable} from 'rxjs';
import {DestinationId} from '../../models/DestinationId';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})


export class SearchBarComponent {

//output pour l'index component
  @Output() searchResults = new EventEmitter<Observable<DestinationId[]>>();
  criteria: SearchCriteria = {tags: [], type: ""};

  //todo : get tags from the server
  availableTags: string[] = ['wifi', 'swimmpool', 'all-in', 'no pet', 'no smoke'];
  isTagsDropdownOpen: boolean = false;

  constructor(private searchService: SearchService) {
  }

  search(): void {
    const results$ = this.searchService.search(this.criteria);
    this.searchResults.emit(results$);
  }

  toggleTag(tag: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.criteria.tags?.push(tag);
    } else {
      this.criteria.tags = this.criteria.tags?.filter((t) => t !== tag);
    }
  }
}
