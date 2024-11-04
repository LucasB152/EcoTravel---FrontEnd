import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/test'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir les données
  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
