import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey: string = 'auth-token';

  getUserId(): string {
    const token = this.getDecodedToken();
    return token?.sub || null;
  }

  getUserRole(): string | null {
    const token = this.getDecodedToken();
    return token?.role || null;
  }

  saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;

    const token = sessionStorage.getItem(this.tokenKey);
    return token && token.split('.').length === 3 ? token : null;
  }


  removeToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  private getDecodedToken(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
