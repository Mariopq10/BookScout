import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage{
  email!: string;
  password!: string;
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(private authService: AuthService, private router: Router, private loadingController : LoadingController) {}

  validarEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }

  async register() {
    try {
      await this.authService.login(this.email!, this.password!);
      const loading = await this.loadingController.create({
        message: 'Haciendo hueco en tu librería...',
        duration: 2000
      });
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }
  }

}
