import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GoogleMapsModule} from '@angular/google-maps';
import { HeaderComponent } from './core/components/header/header.component';
import {RouterLink, RouterLinkActive, RouterModule} from '@angular/router';
import { IndexComponent } from './features/index/index.component';
import { routes } from './app.routes';
import { LocationCardComponent } from './shared/components/location-card/location-card.component';
import { CardsListComponent } from './shared/components/cards-list/cards-list.component';
import { DestinationDetailsComponent } from './features/destinationDetails/destination-details/destination-details.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { CarouselImageComponent } from './features/destinationDetails/carousel-image/carousel-image.component';
import { ReviewCardComponent } from './features/destinationDetails/review-card/review-card.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './core/auth.interceptor';
import { ProfileComponent } from './features/profile/profile.component';
import { DestinationCreationComponent } from './features/destination-creation/destination-creation.component';
import { ProfileEditComponent } from './features/profile-edit/profile-edit.component';
import { NotificationComponent } from './core/components/notification/notification.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { HostAccountRequestComponent } from './features/host-account-request/host-account-request.component';
import { HostRequestListComponent } from './features/admin/host-request-list/host-request-list.component';
import { AdministratorManagementComponent } from './features/admin/administrator-management/administrator-management.component';
import { TagsManagementComponent } from './features/admin/tags-management/tags-management.component';
import { ReportListComponent } from './features/admin/report-list/report-list.component';
import {CoreModule} from './core/core.module';
import {FeaturesModule} from './features/features.module';
import { ItineraryModalComponent } from './features/destinationDetails/itinerary-modal/itinerary-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    LocationCardComponent,
    CardsListComponent,
    DestinationDetailsComponent,
    FooterComponent,
    CarouselImageComponent,
    ReviewCardComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DestinationCreationComponent,
    ProfileComponent,
    ProfileEditComponent,
    NotificationComponent,
    LoadingSpinnerComponent,
    HostAccountRequestComponent,
    HostRequestListComponent,
    AdministratorManagementComponent,
    TagsManagementComponent,
    ReportListComponent,
    ItineraryModalComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    FeaturesModule
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
