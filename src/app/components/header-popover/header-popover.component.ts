import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavigationControl } from 'mapbox-gl';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header-popover',
  templateUrl: './header-popover.component.html',
  styleUrls: ['./header-popover.component.scss'],
})
export class HeaderPopoverComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {}

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'logoutAlert',
      header: '¿Estas seguro?',
      message: 'Se cerrará la sesión actual.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
          handler: () => {
            console.log('Cerrar sesión cancelado');
          }
        }, {
          text: 'Salir',
          cssClass: 'confirmSOS',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirma cerrar sesión');
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          }
        }
      ]
    });

    await alert.present();
  }

}
