import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Request} from '../models/Request';
import {Tag} from '../models/Tag';

@Injectable({
  providedIn: 'root',
})
export class RequestService {

  constructor(private http: HttpClient) {}

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${environment.API_URL}/request`);
  }

  postRequest(request: Request): Observable<any> {
    return this.http.post(`${environment.API_URL}/request`, request);
  }

  updateRequestStatus(id: string, status: string, message: string): Observable<Request[]> {
    const url = `${environment.API_URL}/request/${id}`;
    return this.http.put<{Message: string, Requests: Request[] }>(url, { status, message }).pipe(
      map(data => data.Requests)
    );
  }
}
