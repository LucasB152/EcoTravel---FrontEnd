import {Component, Input, OnInit} from '@angular/core';
import {LocationActivity} from '../../../core/models/LocationActivity';
import {Router} from '@angular/router';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrl: './location-card.component.scss'
})
export class LocationCardComponent implements OnInit {
  @Input() locationActivity!: LocationActivity;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    //this.locationActivity = new LocationActivity("David Goggins", "Ceci est David Goggins", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSONO-MiXOE-jdAZjO49IRh7llcoZvJIEwYX7Vx-u24S3Ncf80", "En enfer");
  }

  onContinue(id: number): void {
    this.router.navigateByUrl(`/test/${id}`);
  }

}
