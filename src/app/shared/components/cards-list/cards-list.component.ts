import {Component, Input} from '@angular/core';
import {Destination} from '../../../core/models/Destination';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss'
})
export class CardsListComponent {
  @Input() destinations: any[] = [];
}
