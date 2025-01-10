import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Itinerary} from '../models/Itinerary';
import {Step} from '../models/Step';

@Injectable({
  providedIn: 'root',
})
export class ItineraryService {
  constructor(private userService: UserService, private httpClient: HttpClient) {
  }

  createItinerary(title: string, destinationID: string): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}/itinerary`, {
      title: title,
      firstDestination: destinationID,
      userId: this.userService.getUserId()
    });
  }

  getItinerariesFromUser(): Observable<Itinerary[]> {
    return this.httpClient.get<Itinerary[]>(`${environment.API_URL}/itinerary/user/${this.userService.getUserId()}`);
  }

  addToItinerary(stepToAdd: Step): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}/step`, stepToAdd);
  }
}
