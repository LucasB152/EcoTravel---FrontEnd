import {Component, HostListener, OnInit} from '@angular/core';
import {Destination} from '../../core/models/Destination';
import {LocationService} from '../../core/services/location.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{
  isDropdownOpen: boolean = false;
  selectedCategory: string = "All categories";
  destination$!: Observable<Destination[]>;
  isLoading : boolean = true;

  constructor(private destinationService: LocationService) {}

  ngOnInit(): void {
        this.destination$ = this.destinationService.getMostPopularLocation();
        this.isLoading = false;
    }

  toggleDropdown = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.isDropdownOpen = false;
    console.log('Catégorie sélectionnée :', category);
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('#dropdown-button') && !target.closest('#dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}
