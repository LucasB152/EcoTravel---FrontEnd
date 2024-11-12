import { Routes } from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LocationDetailsComponent} from './location-details/location-details.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'test/:id', component: LocationDetailsComponent },
];
