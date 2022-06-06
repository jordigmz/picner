/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';
import { Area } from '../interfaces/areas';
import { AreasService } from '../services/areas.service';

@Component({
  selector: 'app-areas-saved',
  templateUrl: './areas-saved.page.html',
  styleUrls: ['./areas-saved.page.scss'],
})
export class AreasSavedPage implements OnInit {
  user: User = {} as User;
  areas: Area[] = [];

  constructor(private usersService: UsersService,
    private areasService: AreasService,
    private alertCrl: AlertController,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.usersService.getUser().subscribe((user) => {
      this.user = user;

      if(this.user.guardados !== []) {
        for(let idArea of this.user.guardados) {
          this.areasService.getArea(idArea).subscribe((area) => {
            this.areas.push(area);
          });
        }
      }
    });
  }

  async delete(id: string) {
    const alert = await this.alertCrl.create({
      header: 'Dejar de guardar',
      message: '¿Deseas eliminar esta área de guardados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.user.guardados = this.user.guardados.filter(saved => saved !== id);

            this.areas = [];

            for(let idArea of this.user.guardados) {
              this.areasService.getArea(idArea).subscribe((area) => {
                this.areas.push(area);
              });
            }

            this.usersService.editUser(this.user).subscribe(
              async () => {
                (await this.toast.create({
                  duration: 1200,
                  position: 'bottom',
                  color: 'primary',
                  icon: 'information-circle',
                  message: 'Se eliminó de guardados.'
                })).present();
              }
            );
          }
        }
      ]
    });
    alert.present();
  }
}
