import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu-tab',
  templateUrl: './menu-tab.component.html',
  styleUrls: ['./menu-tab.component.scss'],
})
export class MenuTabComponent implements OnInit {
  contactSOS = 112;
  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async emergencyCall() {
    const alert = await this.alertController.create({
      cssClass: 'emergencyAlert',
      header: '¿Necesitas ayuda?',
      message: 'Solicita SOS por defecto al número <strong>112</strong> o al contacto de emergencia establecido.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          id: 'cancel-button',
          handler: () => {
            console.log('Cancela llamar a emergencias');
          }
        }, {
          text: 'Sí',
          cssClass: 'confirmSOS',
          id: 'confirm-button',
          handler: () => {
            console.log('Confirma llamar a emergencias');
            window.open('tel:'+this.contactSOS);
          }
        }
      ]
    });

    await alert.present();
  }
}
