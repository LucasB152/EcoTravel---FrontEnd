import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Destination} from '../models/Destination';
import {environment} from '../../../environments/environment';
import {DestinationCreationDto} from '../models/DestinationCreationDto';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}

  createNewDestination(destination: DestinationCreationDto) {
    //TODO faire la conversion latitude longitude
    console.log(destination);
    console.log("je lance une requete api");
    console.log(`${environment.API_URL}/destination`);
    return this.http.post<any>(`http://localhost:8081/api/destination/test`, destination);
  }

  getMostPopularLocation(): Observable<Destination[]> {
    return this.http.get<Destination[]>(`${environment.API_URL}/destination/popular-destination`);
  }

  getDestinationDetails(destinationId: number) {
    return this.http.get<Destination>(`${environment.API_URL}/destination/${destinationId}`);
  }

  getLocationTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.API_URL}/destination/types`);
  }
}
