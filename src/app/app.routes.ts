import { Routes } from '@angular/router';
import {IndexComponent} from './features/index/index.component';
import {DestinationDetailsComponent} from './features/destinationDetails/destination-details/destination-details.component';
import {MapComponent} from './map/map.component';
import {LoginComponent} from './features/login/login.component';
import {RegisterComponent} from './features/register/register.component';
import {ProfileComponent} from './features/profile/profile.component';
import {LoggedInGuard} from './core/services/LoggedInGuard';
import {AuthGuard} from './core/services/auth.guard';
import {ProfileEditComponent} from './features/profile-edit/profile-edit.component';
import {DestinationCreationComponent} from './features/destination-creation/destination-creation.component';
import {HostAccountRequestComponent} from './host-account-request/host-account-request.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'destination/:id', component: DestinationDetailsComponent },
  { path: 'map', component: MapComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'create-destination', component: DestinationCreationComponent },
  { path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'host-account-request', component: HostAccountRequestComponent, canActivate: [AuthGuard] },
];
