import { Routes } from '@angular/router';
import {IndexComponent} from './features/index/index.component';
import {DestinationDetailsComponent} from './features/destinationDetails/destination-details/destination-details.component';
import {MapComponent} from './map/map.component';
import {LoginComponent} from './features/login/login.component';
import {RegisterComponent} from './features/register/register.component';
import {ProfileComponent} from './features/profile/profile.component';
import {LoggedInGuard} from './core/services/LoggedInGuard';
import {AuthService} from './core/services/auth.service';
import {AuthGuard} from './core/services/auth.guard';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'destination/:id', component: DestinationDetailsComponent },
  { path: 'map', component: MapComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];
