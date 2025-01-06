import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  uploadImage(file: File): Observable<string> {
    const id: string = this.tokenService.getUserId();
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${environment.API_URL}/user/picture/${id}`, formData, { responseType: 'text' });
  }
}
