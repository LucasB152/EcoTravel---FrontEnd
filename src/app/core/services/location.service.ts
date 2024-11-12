import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocationActivity} from '../models/LocationActivity';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getMostPopularLocation(): Observable<LocationActivity[]> {
    return this.http.get<LocationActivity[]>('http://localhost:8080/popular-location');
  }
}
