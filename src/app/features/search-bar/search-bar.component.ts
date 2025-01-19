import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {TagsService} from '../../core/services/tags.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss'
})

export class SearchBarComponent implements OnInit {

    @Output() searchResults = new EventEmitter<any>();

    availableTags$: Observable<string[]> = new Observable();
    isTagsDropdownOpen: boolean = false;
    query: string = '';
    tags: string[] = [];
    type: string = '';

    constructor(
        private tagService: TagsService
    ) {
    }

    ngOnInit(): void {
        this.availableTags$ = this.tagService.getTags().pipe(
            map(tags => tags.map(tag => tag.name))
        );
    }

    search(): void {
      this.searchResults.emit({query: this.query, tags: this.tags, type: this.type});
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
