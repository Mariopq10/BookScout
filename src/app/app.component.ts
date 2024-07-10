import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';


register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userName!: string;
  userPhoto!: string;
  menuType: string = 'reveal';
  constructor(private menu: MenuController, private navCtrl: NavController) {}

  closeMenuAndNavigate(url: string) {
    this.menu.close(); // Cierra el menú lateral
    this.navCtrl.navigateRoot(url); // Navega a la ruta especificada
  }
  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.userName = localStorage.getItem('displayname') || 'Usuario';
    this.userPhoto = localStorage.getItem('photo') || 'assets/default-avatar.png';
  }
}
