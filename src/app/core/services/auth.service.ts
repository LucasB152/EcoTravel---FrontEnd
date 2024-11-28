import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Users } from '../models/Users';
import { APP_CONSTANTS } from '../../shared/constants';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth-token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!this.getToken();
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUserId(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.sub;
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.role : null;
  }

  register(user: Users): Observable<any> {
    return this.http.post(`${APP_CONSTANTS.API_URL}/auth/signup`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${APP_CONSTANTS.API_URL}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  logout(): void {
    this.removeToken();
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${APP_CONSTANTS.API_URL}/user/${id}`, {});
  }
}
