import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { GoogleBooksService } from 'src/app/services/googlebooks.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  bookshelves: any[] = [];
  accessToken = localStorage.getItem('token');

  constructor(private service: GoogleBooksService,private http: HttpClient) {}
  async ngOnInit(): Promise<void> {
    (await this.fetchBookshelves()).subscribe(
      data => {
        if (data && data.items) {
          this.bookshelves = data.items;
        }
      },
      error => {
        console.error('Error fetching bookshelves:', error);
      }
    );
  }


   async fetchBookshelves(): Promise<Observable<any>> {

    if (!this.accessToken) {
      console.error('Access token is missing');
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.accessToken}`
    });

    const params = new HttpParams().set('key', 'AIzaSyChlCe9-bragOxK8rR3MTC4jlhbElcMDe0');

    return this.http.get<any>('https://www.googleapis.com/books/v1/mylibrary/bookshelves', { headers, params }).pipe(
      catchError(error => {
        console.error('Error al buscar libros:', error.message); // Imprimir solo el mensaje de error
        return of(null); // Devolver un observable que emite null en caso de error
      })
    );
  }

}
