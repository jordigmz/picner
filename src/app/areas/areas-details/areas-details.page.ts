/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';
import { Area } from '../interfaces/areas';
import { AreasService } from '../services/areas.service';

@Component({
  selector: 'app-areas-details',
  templateUrl: './areas-details.page.html',
  styleUrls: ['./areas-details.page.scss'],
})
export class AreasDetailsPage implements OnInit {
  area: Area = {} as Area;
  user: User = {} as User;
  me: User = {} as User;
  saved = false;

  constructor(
    private alertCrl: AlertController,
    private areasService: AreasService,
    private usersService: UsersService,
    private nav: NavController,
    private route: ActivatedRoute,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    this.areasService.getArea(this.route.snapshot.params.id).subscribe((area) => {
      this.area = area;
    });

    this.usersService.getUser(this.area.creator).subscribe((user) => {
      this.user = user;
    });

    this.usersService.getUser().subscribe((user) => {
      this.me = user;

      if(this.me.guardados !== [] && this.me.guardados.filter(saved => saved === this.area._id).length === 1) {
        this.saved = true;
        console.log('guardado');
      } else {
        this.saved = false;
        console.log('desguardado');
      }
    });
  }

  async guardarArea() {
    if (this.saved) {
      this.saved = false;
      this.deleteGuardados(this.area._id);
      console.log('desguardado 2');
    } else {
      this.saved = true;
      console.log('guardado 2');

      this.usersService.getUser().subscribe((user) => {
        this.me = user;
      });

      if(!this.me.guardados.includes(this.area._id)) {
        this.me.guardados.push(this.area._id);

        this.usersService.editUser(this.me).subscribe(
          async () => {
            (await this.toast.create({
              duration: 1200,
              position: 'bottom',
              color: 'primary',
              icon: 'bookmark-sharp',
              message: 'Área guardada.'
            })).present();
          }
        );
      }
    }
  }

  async deleteGuardados(id: string) {
    this.user.guardados = this.user.guardados.filter(saved => saved !== id);

    this.usersService.editUser(this.user).subscribe(
      async () => {
        (await this.toast.create({
          duration: 1200,
          position: 'bottom',
          color: 'danger',
          icon: 'information-circle',
          message: 'Se eliminó de guardados.'
        })).present();
      }
    );
  }

  async delete() {
    const alert = await this.alertCrl.create({
      header: 'Eliminar área',
      message: '¿Seguro que quieres borrar esta área?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.areasService
              .deleteArea(this.area._id)
              .subscribe(() => this.nav.navigateBack(['/areas']));
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }

  startNavigation() {
    StartNavigation.launchMapsApp({
      latitude: this.area.lat,
      longitude: this.area.lng,
      name: 'Cómo llegar',
    });
  }
}
