import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File, folderName: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${environment.API_URL}${folderName}`,
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

  deletePicture(imageUrl: string, destinationId: string): Observable<any> {
    return this.http.delete(`${environment.API_URL}/host/destination/${destinationId}/image`, {
      body: { imageUrl }
    });
  }
}
