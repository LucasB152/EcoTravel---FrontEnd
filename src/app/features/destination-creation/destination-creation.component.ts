import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import {LocationService} from '../../core/services/location.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-destination-creation',
  templateUrl: './destination-creation.component.html',
  styleUrl: './destination-creation.component.scss'
})
export class DestinationCreationComponent {

  destinationForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    capacity: new FormControl(''),
    contactPhone: new FormControl(''),
    contactEmail: new FormControl(''),

    //TODO rajouter is visible dans le form

    country: new FormControl(''),
    location: new FormControl(''),
    street: new FormControl(''),
    number: new FormControl(''),
    zipcode: new FormControl(''),
  });

  destinationTypes!: Observable<string[]>;

  constructor(
    private destinationService: LocationService,
    private authService: AuthService,
    private router: Router
    ) {
    console.log(this.authService.isAuthenticated());
  }

  ngOnInit(): void {
    this.destinationTypes = this.destinationService.getLocationTypes();
  }

  trackByFn(index: number, item: string): string {
    return item; //TODO vérfier
  }

  handleSubmit() {
    alert(this.destinationForm.value.name);
  }
}
