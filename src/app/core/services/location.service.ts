import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Destination} from '../models/Destination';
import {APP_CONSTANTS} from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getMostPopularLocation(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${APP_CONSTANTS.API_URL}/destination/popular-destination`);
  }

  getDestinationDetails(destinationId: number) {
    return this.http.get<Destination>(`${APP_CONSTANTS.API_URL}/destination/${destinationId}`);
  }
}
