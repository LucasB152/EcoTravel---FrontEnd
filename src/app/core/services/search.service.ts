import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DestinationSearch} from '../models/DestinationSearch';
import {SearchResult} from '../models/SearchResult';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private baseUrl = `${environment.API_URL}/destination`;

  constructor(private http: HttpClient) {
  }

  searchDestinations(query?: string, tags?: string[], type?: string, page: number = 1, size: number = 10): Observable<SearchResult> {
    let params = new HttpParams().set('page', page).set('size', size);

    if (query) {
      params = params.set('q', query);
    }

    if (tags && tags.length > 0) {
      params = params.set('tags', tags.join(','));
    }

    if (type) {
      params = params.set('type', type);
    }


    return this.http.get(`${this.baseUrl}`, {params}).pipe(
      map((response: any) => {
        return {
          page: response.page,
          size: response.size,
          totalPages: response.totalPages,
          totalResults: response.totalResults,
          destinations: this.transformDestinations(response.content)
        };
      })
    );
  }

  private transformDestinations(content: any[]): DestinationSearch[] {
    return content.map(destination => {
      return {
        destinationID: destination.destinationID,
        name: destination.name,
        description: destination.description,
        images: destination.images,
        longitude: destination.longitude,
        latitude: destination.latitude
      };
    });
  }
}
