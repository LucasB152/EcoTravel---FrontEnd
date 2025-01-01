import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Users} from '../models/Users';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUpdated = new BehaviorSubject<boolean>(false);
  userUpdated$ = this.userUpdated.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getUserById(): Observable<any> {
    const id: string = this.tokenService.getUserId();
    return this.http.get<any>(`${environment.API_URL}/user/${id}`);
  }

  getUserRole(): string | null{
    return this.tokenService.getUserRole();
  }

  deleteUser(): Observable<any> {
    const userId = this.tokenService.getUserId();
    return this.http.delete(`${environment.API_URL}/user/${userId}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/user/all`);
  }

  modifyUserDetails(user: Users, id: string): Observable<any> {
    return this.http.put(`${environment.API_URL}/user/${id}`, user);
  }

  notifyUserUpdated(){
    this.userUpdated.next(true);
  }

  modifyUserPassword(currentPassword: string, newPassword: string, userId: string): Observable<any> {
    return this.http.put(`${environment.API_URL}/user/${userId}/password`, {currentPassword: currentPassword, newPassword, userId});
  }
}
