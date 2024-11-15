import { Routes } from '@angular/router';
import {IndexComponent} from './features/index/index.component';
import {DestinationDetailsComponent} from './features/destinationDetails/destination-details/destination-details.component';
import {MapComponent} from './map/map.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'destination/:id', component: DestinationDetailsComponent },
  { path: 'map', component: MapComponent },
];
