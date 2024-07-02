import { Component} from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string | undefined;
  password: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.email!, this.password!);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
    }
  }

  async googleLogin() {
    try{
      const googleUser = await this.authService.googleLogin();
    if (googleUser) {
      localStorage.setItem('email' ,googleUser.email!)
      localStorage.setItem('displayname' ,googleUser.displayName!)
      localStorage.setItem('displayname' ,googleUser.displayName!)
      localStorage.setItem('photo' ,googleUser.photoURL!)
      localStorage.setItem('token' ,googleUser.idToken!)


      this.router.navigate(['/tabs']);
    } else {
      console.log('Error en el login con Google');
    }
  } catch (error) {
    console.error(error);
  }
}
}
