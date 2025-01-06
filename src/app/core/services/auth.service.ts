import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Users } from '../models/Users';
import {environment} from '../../../environments/environment';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn;
  isLoggedIn$;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.loggedIn = new BehaviorSubject<boolean>(this.tokenService.hasToken());
    this.isLoggedIn$ = this.loggedIn.asObservable();
  }

  register(user: Users): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/signup`, user);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response?.token) {
          this.tokenService.saveToken(response.token, rememberMe);
          this.loggedIn.next(true);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }

  isAdmin(): boolean {
    return this.tokenService.getUserRole() === "ADMIN";
  }

  logout(): void {
    this.tokenService.removeToken();
    this.loggedIn.next(false);
  }
}
