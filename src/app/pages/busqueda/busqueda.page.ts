import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleBooksService } from 'src/app/services/googlebooks.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage  {
  searchQuery: string = '';
  libros: any[] = [];

  constructor(private service: GoogleBooksService, private router: Router) {}


  async verInfoLibro(libroId: string) {
    this.router.navigate(['/info-libro', libroId]);
  }

  async ver(){
    (await this.service.biblioteca()).subscribe(
      response => {
        if (response) {
          console.log('Resultado de búsqueda de libros:', response);
        } else {
          console.log('No se encontraron libros.');
        }
      },
      error => {
        console.error('Error al buscar libros:', error);
      }
    );
  }

  async addLibro(){

    try {
      const response = await this.service.addLibro();
      console.log(response)
    } catch (error) {
      console.error('Error add:', error);
    }
}


async searchBooks() {
  if (this.searchQuery.trim() !== '') {
    try {
      const response = await this.service.searchBooks(this.searchQuery);
      if (response && response.items) {
        this.libros = response.items;
      } else {
        this.libros = [];
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      this.libros = [];
    }
  } else {
    this.libros = [];
  }
}
}
