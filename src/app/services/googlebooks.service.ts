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

  getNewReleases(query: string = 'new releases', maxResults: number = 10): Observable<any> {
    const url = `${this.apiUrl}?q=${query}&maxResults=${maxResults}`;
    return this.http.get<any>(url);
  }
}
