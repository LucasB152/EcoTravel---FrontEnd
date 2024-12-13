import {Component, HostListener, OnInit} from '@angular/core';
import {LocationService} from '../../core/services/location.service';
import {Observable} from 'rxjs';
import {DestinationOnMap} from '../../core/models/DestinationOnMap';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  isDropdownOpen: boolean = false;
  selectedCategory: string = "All categories";
  destinationOnMap$!: Observable<DestinationOnMap[]>;
  searchQuery: string = '';

  constructor(private destinationService: LocationService) {
  }

  ngOnInit(): void {
    //les info nécessaire pour le mettre sur la map
    this.destinationOnMap$ = this.destinationService.getDestinationsOnMap()
  }

  toggleDropdown = () => {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('#dropdown-button') && !target.closest('#dropdown')) {
      this.isDropdownOpen = false;
    }
  }

  onSearch() {
  }

}
