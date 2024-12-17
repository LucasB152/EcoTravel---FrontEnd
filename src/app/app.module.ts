import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GoogleMapsModule} from '@angular/google-maps';
import { MapComponent } from './map/map.component';
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
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
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
    ProfileComponent
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
    CoreModule
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
