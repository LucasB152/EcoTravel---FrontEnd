import {Component, OnInit} from '@angular/core';
import {TagsService} from '../../../core/services/tags.service';
import {Tag} from '../../../core/models/Tag';

@Component({
  selector: 'app-tags-management',
  templateUrl: './tags-management.component.html',
  styleUrl: './tags-management.component.scss'
})
export class TagsManagementComponent implements OnInit {
  tags: Tag[] = [];
  newTag: string = "";

  constructor(private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags() {
    this.tagsService.getTags().subscribe(
      (data) => this.tags = data,
      (error) => console.error('Erreur lors de la récupération des tags', error)
    );
  }

  addTag() {
    if (this.newTag.trim()) {
      this.tagsService.addTag({"name": this.newTag.trim()}).subscribe(
        (data) => {
          this.tags = data;
          this.newTag = '';
        },
        (error) => console.error('Erreur lors de l\'ajout du tag', error)
      );
    }
  }

  deleteTag(tagId: number) {
    this.tagsService.deleteTag(tagId).subscribe(
      (data) => this.tags = data,
      (error) => console.error('Erreur lors de la suppression du tag', error)
    );
  }

}
