import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchService} from '../../core/services/search.service';
import {Observable} from 'rxjs';
import {TagService} from '../../core/services/tag.service';
import {SearchResult} from '../../core/models/SearchResult';
import {map} from "rxjs/operators";

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss'
})

export class SearchBarComponent implements OnInit {

//output pour l'index component
    @Output() searchResults = new EventEmitter<Observable<SearchResult>>();

    availableTags$: Observable<string[]> = new Observable();
    isTagsDropdownOpen: boolean = false;
    query: string = '';
    tags: string[] = [];
    type: string = '';

    constructor(
        private searchService: SearchService,
        private tagService: TagService
    ) {
    }

    ngOnInit(): void {
        this.availableTags$ = this.tagService.getTags().pipe(
            map(tags => tags.map(tag => tag.name))
        );
    }

    search(): void {
        const results$ = this.searchService.searchDestinations(this.query, this.tags, this.type);
        this.searchResults.emit(results$);
    }

    toggleTag(tag: string, event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const isChecked = inputElement.checked;
        if (isChecked) {
            this.tags.push(tag);
        } else {
            this.tags = this.tags.filter((t) => t !== tag);
        }
    }
}
