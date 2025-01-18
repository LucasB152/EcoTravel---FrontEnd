import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Destination} from '../models/Destination';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DestinationCreationDto} from '../models/DestinationCreationDto';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = `${environment.API_URL}/destination`;

  constructor(private http: HttpClient) {}

  getDestinationDetails(destinationId: number) {
    return this.http.get<Destination>(`${this.baseUrl}/${destinationId}`);
  }

}
