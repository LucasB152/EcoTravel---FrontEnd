import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './core/components/header/header.component';
import {RouterLink, RouterLinkActive, RouterModule} from '@angular/router';
import { IndexComponent } from './index/index.component';
import { routes } from './app.routes';
import { LocationCardComponent } from './shared/components/location-card/location-card.component';
import { CardsListComponent } from './shared/components/cards-list/cards-list.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { CarouselImageComponent } from './carousel-image/carousel-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    LocationCardComponent,
    CardsListComponent,
    LocationDetailsComponent,
    FooterComponent,
    CarouselImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    RouterLink,
    RouterLinkActive
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
