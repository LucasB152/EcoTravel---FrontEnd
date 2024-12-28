import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {SearchCriteria} from '../models/search-criteria.interface';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DestinationId} from '../models/DestinationId';

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  private baseUrl = `${environment.API_URL}/destination/search`;
  //http://localhost:8081/api/destination/search

  constructor(private http: HttpClient) {
  }

  /**
   * renvoie tout les id des destinations avec ou sans la recherche
   * @param criteria PAS OBLIGATOIRE
   */
  search(criteria: SearchCriteria): Observable<DestinationId[]> {
    const params = this.buildHttpParams(criteria);

    return this.http.get<DestinationId[]>(this.baseUrl, {params});
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
      params = params.set('type', '');
    }
    return params;
  }
}
