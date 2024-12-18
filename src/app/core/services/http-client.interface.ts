import {Observable} from 'rxjs';

export interface HttpClientInterface {
  get<T>(url: string): Observable<T>;
}
