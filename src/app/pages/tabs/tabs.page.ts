import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  nombre: string | null;
  photo: string | null;
  menuType: string = 'overlay';
  constructor(private authService: AuthService) {
    this.nombre = localStorage.getItem('displayname')
    this.photo = localStorage.getItem('photo')
  }
  ngOnInit(): void {

  }

}
