import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Users} from '../models/Users';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  modifyUserDetails(user: Users, id: string): Observable<any> {
    console.log(user);
    return this.http.put(`${environment.API_URL}/user/${id}`, user);
  }

  modifyUserPassword(currentPassword: string, newPassword: string): Observable<any> | null {
    return null;
  }
}
