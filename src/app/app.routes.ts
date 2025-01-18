import { Routes } from '@angular/router';
import {IndexComponent} from './features/index/index.component';
import {DestinationDetailsComponent} from './features/destinationDetails/destination-details/destination-details.component';
import {LoginComponent} from './features/login/login.component';
import {RegisterComponent} from './features/register/register.component';
import {ProfileComponent} from './features/profile/profile.component';
import {LoggedInGuard} from './core/guard/LoggedInGuard';
import {AuthGuard} from './core/guard/auth.guard';
import {ProfileEditComponent} from './features/profile-edit/profile-edit.component';
import {HostAccountRequestComponent} from './features/host-account-request/host-account-request.component';
import {HostRequestListComponent} from './features/admin/host-request-list/host-request-list.component';
import {RoleGuard} from './core/guard/role.guard';
import {AdministratorManagementComponent} from './features/admin/administrator-management/administrator-management.component';
import {TagsManagementComponent} from './features/admin/tags-management/tags-management.component';
import {ReportListComponent} from './features/admin/report-list/report-list.component';
import {EmailVerificationComponent} from './features/email-verification/email-verification.component';
import {ItineraryDetailsComponent} from './features/itinerary-details/itinerary-details.component';
import {DestinationFormComponent} from './features/destination-form/destination-form.component';
import {MyDestinationComponent} from './features/my-destination/my-destination.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'destination/:id', component: DestinationDetailsComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]},
  { path: 'verify-email/:token', component: EmailVerificationComponent, canActivate: [LoggedInGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'create-destination', component: DestinationFormComponent},
  { path: 'profile-edit', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'host-account-request', component: HostAccountRequestComponent, canActivate: [AuthGuard] },
  { path: 'host-requests', component: HostRequestListComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'administrators-management', component: AdministratorManagementComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'tags-management', component: TagsManagementComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'reports', component: ReportListComponent, canActivate: [RoleGuard], data: { roles: ['ADMIN'] } },
  { path: 'itinerary/:id', component: ItineraryDetailsComponent, canActivate: [AuthGuard] },
  { path: 'myDestination', component: MyDestinationComponent, canActivate: [RoleGuard], data: { roles: ['HOST']}}
];
