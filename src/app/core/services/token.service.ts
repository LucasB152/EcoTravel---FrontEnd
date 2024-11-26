import { Injectable } from "@angular/core";
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'auth-token';

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null | undefined {
    if(typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(this.tokenKey);
    }else{
      console.error('Could not get token from localStorage');
    }
    return null;
  }

  removeToken(): void{
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken()
  }

  getUserInfo(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }
}
