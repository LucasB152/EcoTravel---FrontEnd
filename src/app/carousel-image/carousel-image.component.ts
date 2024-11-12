import {Component, OnDestroy, OnInit} from '@angular/core';
import {of} from 'rxjs';

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styleUrl: './carousel-image.component.scss'
})
export class CarouselImageComponent{
  images: string[] = [
    'https://via.placeholder.com/600x400/FF5733/FFFFFF?text=Image+1',
    'https://via.placeholder.com/600x400/33FF57/FFFFFF?text=Image+2',
    'https://via.placeholder.com/600x400/3357FF/FFFFFF?text=Image+3',
    'https://via.placeholder.com/600x400/FF33A6/FFFFFF?text=Image+4',
  ];

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
