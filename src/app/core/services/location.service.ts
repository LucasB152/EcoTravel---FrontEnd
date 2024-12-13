import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Destination} from '../models/Destination';
import {DestinationOnMap} from '../models/DestinationOnMap';
import {environment} from '../../../environments/environment';
import {HttpClientInterface} from './http-client.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(@Inject(HttpClient) private http: HttpClientInterface) {
  }

  getMostPopularLocation(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${environment.API_URL}/destination/popular-destination`);
  }

  getDestinationDetails(destinationId: number) {
    return this.http.get<Destination>(`${environment.API_URL}/destination/${destinationId}`);
  }


  getDestinationsOnMap(): Observable<DestinationOnMap[]> {
    return this.http.get<DestinationOnMap[]>(`${environment.API_URL}/destination/destination-onmap`).pipe(
      map((destinations: any[]) => destinations.map(destination => ({
        destinationID: destination.destinationID,
        lat: destination.lat,
        lng: destination.lng,
        name: destination.name,
        description: destination.description,
        destinationTypeName: destination.destinationTypeName,
        images: destination.images
      })))
    );
  }
}
