import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpClientInterface} from './http-client.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWrapperService implements HttpClientInterface {
  constructor(private http: HttpClient) {
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
}
