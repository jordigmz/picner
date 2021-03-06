import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.component.html',
  styleUrls: ['./menu-tab.component.scss'],
})
export class MenuTabComponent {
  user: User = {} as User;
  constructor(private alertController: AlertController, private usersService: UsersService) { }

  emergencyCall() {
    this.usersService.getUser().subscribe((user) => {
      this.user = user;
      this.emergencyCallAlert();
    });
  }

  async emergencyCallAlert() {
    const alert = await this.alertController.create({
      cssClass: 'emergencyAlert',
      header: '¿Necesitas ayuda?',
      message: `Solicita SOS al contacto de emergencia <b>${this.user.sos}</b>.`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          id: 'cancel-button'
        }, {
          text: 'Sí',
          cssClass: 'confirmSOS',
          id: 'confirm-button',
          handler: () => {
            window.open('tel:'+this.user.sos);
          }
        }
      ]
    });

    await alert.present();
  }
}
