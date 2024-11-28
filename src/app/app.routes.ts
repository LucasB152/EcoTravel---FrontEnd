import { Routes } from '@angular/router';
import {IndexComponent} from './features/index/index.component';
import {DestinationDetailsComponent} from './features/destinationDetails/destination-details/destination-details.component';
import {MapComponent} from './map/map.component';
import {LoginComponent} from './features/login/login.component';
import {RegisterComponent} from './features/register/register.component';
import {ProfileComponent} from './features/profile/profile.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'destination/:id', component: DestinationDetailsComponent },
  { path: 'map', component: MapComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
];
