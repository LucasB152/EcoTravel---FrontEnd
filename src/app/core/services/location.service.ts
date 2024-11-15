import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Destination} from '../models/Destination';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getMostPopularLocation(): Observable<Destination[]> {
    return this.http.get<Destination[]>('http://localhost:8080/popular-destination');
  }

  getDestinationDetails(destinationId: number) {
    console.log(`http://localhost:8080/destination/${destinationId}`);
    return this.http.get<Destination>(`http://localhost:8080/destination/${destinationId}`);
  }
}
