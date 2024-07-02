// google-books.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  getNewReleases(maxResults: number = 10): Observable<any> {
    const query = 'subject:fiction'; // Puedes cambiar esto a otro término o categoría relevante
    const url = `${this.apiUrl}?q=${query}&orderBy=newest&maxResults=${maxResults}`;
    return this.http.get<any>(url);
  }
}
