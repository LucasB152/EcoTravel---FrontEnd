import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Users} from '../models/Users';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TokenService} from './token.service';
import {response} from 'express';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<Users | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  loadCurrentUser(): Observable<any> {
    const id: string = this.tokenService.getUserId();
    return this.http.get<any>(`${environment.API_URL}/user/${id}`).pipe(
      tap(user => this.userSubject.next(user))
    );
  }

  getUserRole(): string | null {
    return this.tokenService.getUserRole();
  }

  deleteUser(): Observable<any> {
    const userId = this.tokenService.getUserId();
    return this.http.delete(`${environment.API_URL}/user/${userId}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/user/all`);
  }

  modifyUserDetails(user: Users): Observable<any> {
    const id = this.tokenService.getUserId();
    return this.http.put(`${environment.API_URL}/user/${id}`, user).pipe(
      tap(() => this.loadCurrentUser().subscribe())
    );
  }

  modifyUserPassword(currentPassword: string, newPassword: string): Observable<any> {
    const userId: string = this.tokenService.getUserId();
    return this.http.put(`${environment.API_URL}/user/${userId}/password`, {
      currentPassword: currentPassword,
      newPassword,
      userId
    });
  }

  promoteToAdmin(userId: string) {
    return this.http.put(`${environment.API_URL}/admin/${userId}/role/admin`, "");
  }

  getUserId() {
    return this.tokenService.getUserId();
  }
}
