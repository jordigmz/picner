import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.component.html',
  styleUrls: ['./menu-tab.component.scss'],
})
export class MenuTabComponent implements OnInit {
  user: User;
  constructor(private alertController: AlertController, private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  async emergencyCall() {
    const alert = await this.alertController.create({
      cssClass: 'emergencyAlert',
      header: '¿Necesitas ayuda?',
      message: `Solicita SOS al contacto de emergencia <b>${this.user.sos}</b>.`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          id: 'cancel-button',
          handler: () => {
            console.log('Cancela llamar al contacto de emergencia');
          }
        }, {
          text: 'Sí',
          cssClass: 'confirmSOS',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirma llamar al contacto de emergencia');
            window.open('tel:'+this.user.sos);
          }
        }
      ]
    });

    await alert.present();
  }
}
