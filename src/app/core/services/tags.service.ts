import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Tag} from '../models/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.API_URL}/tag`);
  }

  addTag(tag: Tag): Observable<Tag[]> {
    return this.http.post<{Message: string, Tags: Tag[]}>(`${environment.API_URL}/tag`, tag, { headers: { 'Content-Type': 'application/json' } })
      .pipe(
        map(data => data.Tags)
      );
  }

  deleteTag(id: number): Observable<Tag[]> {
    return this.http.delete<{Message: string, Tags: Tag[] }>(`${environment.API_URL}/tag/${id}`)
      .pipe(
        map(data => data.Tags)
      );
  }
}

