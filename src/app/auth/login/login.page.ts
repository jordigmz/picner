import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = '';
  password = '';
  user = null;
  accessToken = '';

  constructor(private platform: Platform, private authService: AuthService, private router: Router, private alertCtrl: AlertController) { }

  async ngOnInit() {
    /*const resp = await FacebookLogin.getCurrentAccessToken() as FacebookLoginResponse;
    if (resp.accessToken) {
      this.accessToken = resp.accessToken.token;
    }*/
  }

  login() {
    this.authService
      .login(this.username, this.password)
      .subscribe(
        () => this.router.navigate(['/areas']),
        async (error) => {
          (
            await this.alertCtrl.create({
              header: 'Fallo en el inicio de sesión',
              message: 'Los datos introducidos no son correctos. Por favor, compruébelos.',
              buttons: ['Aceptar'],
            })
          ).present();
        }
      );
  }

  /*async loginGoogle() {
    try {
      this.user = await GoogleAuth.signIn();
    } catch (err) {
      console.error(err);
    }
  }

  async loginFacebook() {
    const resp = await FacebookLogin.login({ permissions: ['email'] }) as FacebookLoginResponse;
    if (resp.accessToken) {
      this.accessToken = resp.accessToken.token;
    }
  }*/

  async logout() {
    //await FacebookLogin.logout();
    this.accessToken = '';
  }
}
