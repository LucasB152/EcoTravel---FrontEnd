import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ReviewResponseDto} from '../models/ReviewResponseDto';
import {ReviewCreationDto} from '../models/ReviewCreationDto';
import {ReviewEditDto} from '../models/ReviewEditDto';


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

  createReview(review: ReviewCreationDto) {
    return this.http.post<ReviewCreationDto>(this.baseUrl, review);
  }

  updateReview(review: ReviewEditDto) {
    return this.http.put<void>(this.baseUrl, review);
  }

}
