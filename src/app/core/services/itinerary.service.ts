import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Itinerary} from '../models/Itinerary';
import {Step} from '../models/Step';
import {Tag} from '../models/Tag';
import {StepAddDTO} from '../models/StepAddDTO';

@Injectable({
  providedIn: 'root',
})
export class ItineraryService {
  constructor(private userService: UserService,
              private httpClient: HttpClient) {
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

  addToItinerary(stepToAdd: StepAddDTO): Observable<any> {
    return this.httpClient.post(`${environment.API_URL}/step`, stepToAdd);
  }

  getItinerary(itineraryId: string): Observable<any> {
    return this.httpClient.get(`${environment.API_URL}/itinerary/${itineraryId}`);
  }

  deleteItinerary(itineraryId: string): Observable<any> {
    return this.httpClient.delete(`${environment.API_URL}/itinerary/${itineraryId}`);
  }

  deleteStepFromItinerary(itineraryId: string, stepId: string): Observable<Itinerary> {
    return this.httpClient.delete<{Message: string, Itinerary: Itinerary }>(`${environment.API_URL}/itinerary/${itineraryId}/step/${stepId}`)
      .pipe(
      map(data => data.Itinerary)
    );
  }

  changeItineraryName(itineraryId: string, newTitle: string) {
    return this.httpClient.put<{Message: string, Itinerary: Itinerary }>(`${environment.API_URL}/itinerary/${itineraryId}/name`, newTitle)
      .pipe(
        map(data => data.Itinerary)
      );
  }

  moveStepUp(stepId: string, itineraryId: string): Observable<any> {
    return this.httpClient.put<{Message: string, Itinerary: Itinerary }>(`${environment.API_URL}/itinerary/${itineraryId}/step/up`, stepId)
      .pipe(
        map(data => data.Itinerary)
      );
  }

  moveStepDown(stepId: string, itineraryId: string): Observable<any> {
    return this.httpClient.put<{Message: string, Itinerary: Itinerary }>(`${environment.API_URL}/itinerary/${itineraryId}/step/down`, stepId)
      .pipe(
        map(data => data.Itinerary)
      );
  }
}
