import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleBooksService } from 'src/app/services/googlebooks.service';

@Component({
  selector: 'app-info-libro',
  templateUrl: './info-libro.page.html',
  styleUrls: ['./info-libro.page.scss'],
})
export class InfoLibroPage implements OnInit {
  libroId: string | null | undefined;
  libro: any; // Aquí almacenarás los datos del libro

  constructor(
    private route: ActivatedRoute,
    private googleBooksService: GoogleBooksService
  ) { }

  ngOnInit() {
    this.libroId = this.route.snapshot.paramMap.get('id');
    this.cargarInfoLibro();
  }

  async cargarInfoLibro() {
    try {
      this.libro = this.googleBooksService.obtenerLibroPorId(this.libroId!);
      console.log('Datos del libro:', this.libro);
    } catch (error) {
      console.error('Error al obtener información del libro:', error);
    }
  }
}
