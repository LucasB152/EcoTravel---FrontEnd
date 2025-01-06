import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  uploadFile(file: File, folderName: string): Observable<string> {
    const id: string = this.tokenService.getUserId();
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${environment.API_URL}${folderName}${id}`,
      formData,
      { responseType: 'text' }
    );
  }

  uploadFiles(files: File[], folderName: string): Observable<any> {
    const uploadObservables = files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);

      return this.http.post(
        `${environment.API_URL}${folderName}`,
        formData,
        { responseType: 'text' }
      );
    });

    return forkJoin(uploadObservables);
  }
}
