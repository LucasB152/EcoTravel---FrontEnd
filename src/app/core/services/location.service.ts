import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Destination} from '../models/Destination';
import {environment} from '../../../environments/environment';
import {DestinationOnMap} from '../models/DestinationOnMap';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {
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
        destinationTypeName: destination.destinationTypeName,
        images: destination.images
      })))
    );
  }
}
