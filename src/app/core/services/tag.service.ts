import {Inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClientInterface} from './http-client.interface';
import {HttpClient} from '@angular/common/http';
import {Tag} from '../models/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(@Inject(HttpClient) private http: HttpClientInterface) {
  }

  getTags() {
    return this.http.get<Tag[]>(`${environment.API_URL}/tag`);
  }

  getTagDetails(TagId: number) {
    return this.http.get<Tag>(`${environment.API_URL}/tag/${TagId}`);
  }
}
