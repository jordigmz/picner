import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username = '';
  password = '';
  user = null;
  accessToken = '';

  constructor(private authService: AuthService, private router: Router, private alertCtrl: AlertController) { }

  login() {
    this.authService
      .login(this.username, this.password)
      .subscribe(
        () => this.router.navigate(['/areas']),
        async (error) => {
          (
            await this.alertCtrl.create({
              header: 'No podemos iniciar sesión en tu cuenta',
              message: 'Los datos introducidos no son correctos. Por favor, compruébalos.',
              buttons: ['Aceptar'],
            })
          ).present();
        }
      );
  }

  async logout() {
    this.accessToken = '';
  }
}
