import {HttpClient} from '@angular/common/http';
import {DestinationCreationDto} from '../models/DestinationCreationDto';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

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
}
