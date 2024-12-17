import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SearchCriteria} from '../models/search-criteria.interface';
import {Observable} from 'rxjs';
import {Destination} from '../models/Destination';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  private baseUrl = `${environment.API_URL}/destination/search`;

  constructor(private http: HttpClient) {
  }

  /**
   * Executes a search query based on the provided criteria.
   * @param criteria The search criteria for filtering destinations.
   * @returns An observable containing an array of destinations.
   */
  search(criteria: SearchCriteria): Observable<Destination[]> {
    const params = this.buildHttpParams(criteria);

    return this.http.get<Destination[]>(this.baseUrl, {params});

  }

  /**
   * Converts the search criteria into HTTP query parameters.
   * @param criteria The search criteria.
   * @returns HttpParams to pass with the HTTP request.
   */
  private buildHttpParams(criteria: SearchCriteria): HttpParams {
    let params = new HttpParams();

    if (criteria.query) {
      params = params.set('query', criteria.query);
    }
    if (criteria.tags) {
      criteria.tags.forEach((tag) => {
        params = params.append('tags', tag);
      });
    }
    if (criteria.type) {
      params = params.set('type', criteria.type);
    } else {
      params = params.set('type', 'both');
    }
    if (criteria.page !== undefined) {
      params = params.set('page', criteria.page.toString());
    }
    if (criteria.size !== undefined) {
      params = params.set('size', criteria.size.toString());
    }
    return params;
  }
}
