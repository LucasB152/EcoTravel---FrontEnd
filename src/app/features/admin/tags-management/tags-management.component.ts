import {Component, OnInit} from '@angular/core';
import {TagsService} from '../../../core/services/tags.service';
import {Tag} from '../../../core/models/Tag';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-tags-management',
  templateUrl: './tags-management.component.html',
  styleUrl: './tags-management.component.scss'
})
export class TagsManagementComponent implements OnInit {
  tags$: Observable<Tag[]> = of([]);
  newTag: string = "";

  constructor(private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags() {
    this.tags$ = this.tagsService.getTags();
  }

  addTag() {
    if (this.newTag.trim()) {
      this.tags$ = this.tagsService.addTag({"name": this.newTag.trim()});
      this.newTag = "";
    }
  }

  deleteTag(tagId: string) {
    this.tags$ = this.tagsService.deleteTag(tagId);
  }

}
