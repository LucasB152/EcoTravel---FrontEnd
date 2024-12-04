import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Users } from '../models/Users';
import { jwtDecode } from 'jwt-decode';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth-token';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  register(user: Users): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/signup`, user);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response && response.token) {
          rememberMe ? this.saveToken(response.token) : this.saveTokenOnSession(response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  logout(): void {
    this.loggedIn.next(false);
    this.removeToken();
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private saveTokenOnSession(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;

    const token = sessionStorage.getItem(this.tokenKey) || localStorage.getItem(this.tokenKey);
    return token && token.split('.').length === 3 ? token : null;
  }


  private removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }

  private getDecodedToken(): any {
    const token = this.getToken();
    if (token != null) {
      return jwtDecode(token);
    }
    return null;
  }

  getUserId(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.sub;
  }

  public getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.role : null;
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/user/${id}`, {});
  }
}
