import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleBooksService } from 'src/app/services/googlebooks.service';

@Component({
  selector: 'app-info-libro',
  templateUrl: './info-libro.page.html',
  styleUrls: ['./info-libro.page.scss'],
})
export class InfoLibroPage implements OnInit {
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
      const currentNavigation = this.router.getCurrentNavigation();
      if (currentNavigation && currentNavigation.previousNavigation && currentNavigation.previousNavigation.finalUrl) {
        this.previousUrl = currentNavigation.previousNavigation.finalUrl.toString();
      }
      this.googleBooksService.obtenerLibroPorId(this.libroId).subscribe(
        (data) => {
          this.libro = data;
          console.log('Datos del libro:', this.libro);
          if (this.libro && this.libro.volumeInfo && this.libro.volumeInfo.authors) {
            const autor = this.libro.volumeInfo.authors[0]; // Considerando el primer autor en la lista
            this.googleBooksService.obtenerLibrosDelMismoAutor(autor);
          }
        },
        (error) => {
          console.error('Error al obtener información del libro:', error);
        }
      );
    } else {
      console.error('No se proporcionó un ID de libro válido');
    }
  }

  obtenerLibrosDelMismoAutor(autor: string) {
    this.googleBooksService.obtenerLibrosPorAutor(autor).subscribe(
      (data) => {
        this.librosDelMismoAutor = data.items; // Suponiendo que la respuesta contiene un arreglo de libros (items)
        console.log('Libros del mismo autor:', this.librosDelMismoAutor);
      },
      (error) => {
        console.error('Error al obtener libros del mismo autor:', error);
      }
    );
  }
}
