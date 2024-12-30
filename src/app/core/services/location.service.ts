import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Destination} from '../models/Destination';
import {environment} from '../../../environments/environment';
import {HttpClientInterface} from './http-client.interface';
import {HttpClient} from '@angular/common/http';
import {DestinationId} from '../models/DestinationId';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(@Inject(HttpClient) private http: HttpClientInterface) {
  }

  getMostPopularLocation(): Observable<DestinationId[]> {
    return this.http.get<DestinationId[]>(`${environment.API_URL}/destination/search`);
  }

  getDestinationDetails(destinationId: number) {
    return this.http.get<Destination>(`${environment.API_URL}/destination/${destinationId}`);
  }

  getLocationTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.API_URL}/destination/types`);
  }
}
