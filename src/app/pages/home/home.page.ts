import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { GoogleBooksService } from 'src/app/services/googlebooks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  libros: any[] = [];
  photo : any
  constructor(private googleBooksService: GoogleBooksService, private menu : MenuController, private router :Router) {
    this.photo = localStorage.getItem('photo')
  }

  ngOnInit() {
    this.getNewReleases();
  }

  async verInfoLibro(libroId: string) {
    this.router.navigate(['/info-libro', libroId]);
  }

  toggleMenu() {
    this.menu.toggle('first'); // 'first' es el ID del menú que quieres abrir/cerrar
  }
  getNewReleases() {
    this.googleBooksService.getNewReleases().subscribe(response => {
      this.libros = response.items;
    });
  }
}
