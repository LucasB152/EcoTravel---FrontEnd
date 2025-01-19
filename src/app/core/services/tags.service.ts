import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Tag} from '../models/Tag';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient, private notificationService: NotificationService) {
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.API_URL}/tag`);
  }

  addTag(tag: Tag): Observable<Tag[]> {
    return this.http.post<{
      Message: string,
      Tags: Tag[]
    }>(`${environment.API_URL}/tag`, tag, {headers: {'Content-Type': 'application/json'}})
      .pipe(
        map(data => data.Tags)
      );
  }

  deleteTag(id: string): Observable<Tag[]> {
    return this.http.delete<{ Message: string, Tags: Tag[] }>(`${environment.API_URL}/tag/${id}`)
      .pipe(
        map(data => data.Tags),
        catchError(() => {
          this.notificationService.showNotificationError("Le tag ne peut pas être supprimé car il est utilisé dans des destinations")
          return this.getTags()
        })
      );
  }
}

