import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  isDropdownOpen: boolean = false;
  selectedCategory: string = "All categories";

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
