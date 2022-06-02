/* eslint-disable no-underscore-dangle */
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { shareReplay } from 'rxjs/operators';
import { Area } from '../interfaces/areas';
import { AreasService } from '../services/areas.service';


@Component({
  selector: 'app-areas-details',
  templateUrl: './areas-details.page.html',
  styleUrls: ['./areas-details.page.scss'],
})
export class AreasDetailsPage implements OnInit {
  area: Area;

  constructor(
    private alertCrl: AlertController,
    private areasService: AreasService,
    private nav: NavController,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.areasService.getArea(this.route.snapshot.params.id).subscribe((area) => {
      this.area = area;
    });
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
}
