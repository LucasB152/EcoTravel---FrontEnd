import {HttpClient} from '@angular/common/http';
import {DestinationCreationDto} from '../models/DestinationCreationDto';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Destination} from '../models/Destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  constructor(private http: HttpClient) {}

  createDestination(destination: DestinationCreationDto, hostID: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/host/${hostID}/destination`, destination);
  }

  getDestinationFromHost(hostID: string): Observable<any> {
    return this.http.get(`${environment.API_URL}/host/${hostID}/destination`);
  }

  deleteDestination(hostId: string, destinationID: string): Observable<any> {
    return this.http.delete(`${environment.API_URL}/host/${hostId}/destination/${destinationID}`);
  }

  getDestinationDetails(destinationId: number): Observable<any> {
    return this.http.get<Destination>(`${environment.API_URL}/destination/${destinationId}`);
  }

  updateDestination(updatedDestination: DestinationCreationDto, hostId: string, destinationId: string): Observable<any> {
    return this.http.put(`${environment.API_URL}/host/${hostId}/destination/${destinationId}`, updatedDestination);
  }
}
