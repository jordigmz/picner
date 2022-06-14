/* eslint-disable @typescript-eslint/no-shadow */
import { Component, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { HeaderPopoverComponent } from 'src/app/components/header-popover/header-popover.component';
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';
import { Area } from '../interfaces/areas';
import { AreasService } from '../services/areas.service';
import { MapComponent } from 'ngx-mapbox-gl';

@Component({
  selector: 'app-areas-map',
  templateUrl: './areas-map.page.html',
  styleUrls: ['./areas-map.page.scss'],
})
export class AreasMapPage {
  @ViewChild(MapComponent) mapComp: MapComponent;

  user: User = {
    name: '',
    username: '',
    email: '',
    password: '',
    avatar: '',
    lat: 38.381783,
    lng: -0.778259,
    guardados: [],
    sos: 112
  };

  areas: Area[] = [];

  coordinates: Position;

  constructor(
    private popoverCtrl: PopoverController,
    private areasService: AreasService,
    private usersService: UsersService
  ) {}

  async ionViewWillEnter() {
    this.coordinates = await Geolocation.getCurrentPosition();

    this.usersService.getUser().subscribe((user) => {
      this.user = user;

      this.user.lat = this.coordinates.coords.latitude;
      this.user.lng = this.coordinates.coords.longitude;
    });

    this.areasService.getAreas().subscribe((areas) => {
      this.areas = areas;
    });

    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize(); // Necessary for full height
      }
    );
  }

  async openPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: HeaderPopoverComponent,
      cssClass: 'headerPopover',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
