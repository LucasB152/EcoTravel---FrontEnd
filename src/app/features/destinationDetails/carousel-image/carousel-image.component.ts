import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styleUrl: './carousel-image.component.scss'
})
export class CarouselImageComponent{
  @Input() images: string[] = [];

  currentIndex: number = 0;

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }
}
