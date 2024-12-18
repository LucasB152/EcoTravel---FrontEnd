import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {

  constructor(private http: HttpClient) {}

  uploadImage(file: File, id: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${environment.API_URL}/user/picture/${id}`, formData, { responseType: 'text' });
  }
}
