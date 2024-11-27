import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Users} from '../models/User';
import {APP_CONSTANTS} from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: Users): Observable<any> {
    return this.http.post(`${APP_CONSTANTS.API_URL}/auth/signup`, user);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${APP_CONSTANTS.API_URL}/auth/login`, {email, password});
  }

  getUser(email: String): Observable<any> {
    return this.http.get<any>(`${APP_CONSTANTS.API_URL}/user/${email}`, {})
  }
}
