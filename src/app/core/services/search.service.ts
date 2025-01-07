import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {DestinationSearch} from '../models/DestinationSearch';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private baseUrl = `${environment.API_URL}/destination`;
  private http = inject(HttpClient);

  getSearchDestinations(center:{lat:number; lng:number},query?: string, tags?: string[], type?: string, page: number = 1, size: number = 10): Observable<DestinationSearch[]> {
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
        return this.transformDestinations(response.content);
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
