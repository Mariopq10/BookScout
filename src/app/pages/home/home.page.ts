import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from 'src/app/services/googlebooks.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  libros: any[] = [];

  constructor(private googleBooksService: GoogleBooksService) { }

  ngOnInit() {
    this.getNewReleases();
  }

  getNewReleases() {
    this.googleBooksService.getNewReleases().subscribe(response => {
      this.libros = response.items;
    });
  }
}
