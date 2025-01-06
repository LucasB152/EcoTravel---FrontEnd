import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ReviewResponseDto} from '../models/ReviewResponseDto';


@Injectable({
  providedIn: 'root'
})

export class ReviewService {
  private baseUrl = `${environment.API_URL}/review`;

  constructor(private http: HttpClient) {
  }

  getReviews(destinationId: number) {
    return this.http.get<ReviewResponseDto[]>(`${this.baseUrl}/${destinationId}`);
  }
}
