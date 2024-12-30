import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import {LocationService} from '../../core/services/location.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {DestinationCreationDto} from '../../core/models/DestinationCreationDto';
import {AddressDto} from '../../core/models/AddressDto';

@Component({
  selector: 'app-destination-creation',
  templateUrl: './destination-creation.component.html',
  styleUrl: './destination-creation.component.scss'
})
export class DestinationCreationComponent {

  brutForcedId = "ad578818-a4b3-430a-98e1-c0589d640076"; //TODO à changer

  destinationForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    capacity: new FormControl(''),
    contactPhone: new FormControl(''),
    contactEmail: new FormControl(''),

    isVisible: new FormControl(false),
    type:new FormControl(''),

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
  }

  ngOnInit(): void {
    this.destinationTypes = this.destinationService.getLocationTypes();
  }

  trackByFn(index: number, item: string): string {
    return item;
  }

  handleSubmit() {
    const address: AddressDto = new AddressDto(
      this.destinationForm.value.country!,
      this.destinationForm.value.location!,
      this.destinationForm.value.street!,
      this.destinationForm.value.number!,
      this.destinationForm.value.capacity!,
      0,
      0
    );

    const destination: DestinationCreationDto = new DestinationCreationDto(
      this.destinationForm.value.name!,
      this.destinationForm.value.description!,
      this.destinationForm.value.price!,
      this.destinationForm.value.capacity!,
      this.destinationForm.value.contactPhone!,
      this.destinationForm.value.contactEmail!,
      this.destinationForm.value.isVisible!,
      address
    );

    this.destinationService.createNewDestination(destination);
  }
}
