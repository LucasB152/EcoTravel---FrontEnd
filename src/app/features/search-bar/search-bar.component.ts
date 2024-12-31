import {Component, EventEmitter, Output} from '@angular/core';
import {SearchService} from '../../core/services/search.service';
import {Observable} from 'rxjs';
import {TagService} from '../../core/services/tag.service';
import {SearchResult} from '../../core/models/SearchResult';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})


export class SearchBarComponent {

//output pour l'index component
  @Output() searchResults = new EventEmitter<Observable<SearchResult>>();

  availableTags: string[] = [];
  isTagsDropdownOpen: boolean = false;
  query: string = '';
  tags: string[] = [];
  type: string = '';

  constructor(
    private searchService: SearchService,
    private tagService: TagService
  ) {
    this.tagService.getTags().subscribe((tags) => {
      this.availableTags = tags.map((tag) => tag.name);
    });
  }

  search(): void {
    const results$ = this.searchService.searchDestinations(this.query, this.tags, this.type);
    this.searchResults.emit(results$);
  }

  toggleTag(tag: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;
    if (isChecked) {
      this.tags?.push(tag);
    } else {
      this.tags = this.tags?.filter((t) => t !== tag);
    }
  }
}
