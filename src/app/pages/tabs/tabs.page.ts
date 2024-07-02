import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  nombre :string | null
  photo :string | null
  constructor() {
    this.nombre = localStorage.getItem('displayname');
    this.photo = localStorage.getItem('photo')
  }

}
