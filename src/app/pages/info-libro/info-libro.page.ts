import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { GoogleBooksService } from 'src/app/services/googlebooks.service';

@Component({
  selector: 'app-info-libro',
  templateUrl: './info-libro.page.html',
  styleUrls: ['./info-libro.page.scss'],
})
export class InfoLibroPage implements OnInit {
  @ViewChild('swiper', { static: false })
  libroId: string | null | undefined;
  libro: any; // Aquí almacenarás los datos del libro
  librosDelMismoAutor: any[] = [];
  previousUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private googleBooksService: GoogleBooksService,
  ) { }

  ngOnInit() {
    this.libroId = this.route.snapshot.paramMap.get('id');
    this.cargarInfoLibro();
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation && currentNavigation.previousNavigation && currentNavigation.previousNavigation.finalUrl) {
      this.previousUrl = currentNavigation.previousNavigation.finalUrl.toString();
    }
  }

  cargarInfoLibro() {
    if (this.libroId) {
      this.googleBooksService.obtenerLibroPorId(this.libroId)
        .pipe(
          catchError((error) => {
            console.error('Error al obtener información del libro:', error);
            return []; // Retornar un valor por defecto en caso de error
          }),
          finalize(() => {
            if (this.libro && this.libro.volumeInfo && this.libro.volumeInfo.authors) {
              const autor = this.libro.volumeInfo.authors[0]; // Considerando el primer autor en la lista
              this.obtenerLibrosDelMismoAutor(autor);
            }
          })
        )
        .subscribe((data) => {
          this.libro = data;
          console.log('Datos del libro:', this.libro);
        });
    } else {
      console.error('No se proporcionó un ID de libro válido');
    }
  }

  obtenerLibrosDelMismoAutor(autor: string) {
    this.googleBooksService.obtenerLibrosPorAutor(autor)
      .pipe(
        catchError((error) => {
          console.error('Error al obtener libros del mismo autor:', error);
          return []; // Retornar un valor por defecto en caso de error
        })
      )
      .subscribe((data) => {
        this.librosDelMismoAutor = data.items; // Suponiendo que la respuesta contiene un arreglo de libros (items)
        console.log('Libros del mismo autor:', this.librosDelMismoAutor);
      });
  }

  async verInfoLibro(libroId: string) {
    this.router.navigate(['/info-libro', libroId]);
  }
}
