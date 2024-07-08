// google-books.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private userToken = localStorage.getItem('token')

  constructor(private http: HttpClient, private authService: AuthService) { }

  getNewReleases(maxResults: number = 10): Observable<any> {
    const query = 'subject:fiction'; // Puedes cambiar esto a otro término o categoría relevante
    const url = `${this.apiUrl}?q=${query}&orderBy=newest&maxResults=${maxResults}`;
    return this.http.get<any>(url);
  }

  async searchBooks(query: string): Promise<any> {
    if (this.userToken) {
      try {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.userToken}`
        });

        const params = new HttpParams().set('q', query);

        const response = await this.http.get<any>('https://www.googleapis.com/books/v1/volumes', { headers, params })
          .pipe(
            catchError(error => {
              console.error('Error al buscar libros:', error);
              return of(null); // Devolver un observable que emite null en caso de error
            })
          ).toPromise();

        console.log('Resultado de búsqueda de libros:', response);
        return response;
      } catch (error) {
        console.error('Error al buscar libros:', error);
        return null;
      }
    } else {
      console.log('Usuario no autenticado');
      return null;
    }
  }

  async biblioteca(): Promise<Observable<any>> {
    const accessToken = localStorage.getItem('token'); // Asegúrate de que este método devuelve el accessToken correctamente

    if (!accessToken) {
      console.error('Access token is missing');
      return of(null);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<any>('https://www.googleapis.com/books/v1/mylibrary/bookshelves?', { headers }).pipe(
      catchError(error => {
        console.error('Error al buscar libros:', error.message); // Imprimir solo el mensaje de error
        return of(null); // Devolver un observable que emite null en caso de error
      })
    );
  }



  async addLibro():Promise<any>{

      const headers = new HttpHeaders({
         'Authorization': `Bearer ${this.userToken}`,
          'Content-Type': 'application/json',
          'Content-Length': 'CONTENT_LENGTH'
      });
      const params = new HttpParams().set('key', 'AIzaSyChlCe9-bragOxK8rR3MTC4jlhbElcMDe0');

      const params2 = new HttpParams().set('volumeId', 12312312321312);

      return this.http.post('https://www.googleapis.com/books/v1/mylibrary/bookshelves/shelf/addVolume', { headers, params })
        .pipe(
          catchError(error => {
            console.error('Error al agregar volumen a la estantería:', error);
            return throwError(error);
          })
        );
    }


  async obtenerLibroPorId(libroId: string) {
    const url = `${this.apiUrl}/${libroId}`;
    try {
      const response = await this.http.get<any>(url).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }




}

