/* eslint-disable @typescript-eslint/no-shadow */
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { MapComponent } from 'ngx-mapbox-gl';
import { HeaderPopoverComponent } from 'src/app/components/header-popover/header-popover.component';
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';
import { Area } from '../interfaces/areas';
import { AreasService } from '../services/areas.service';

@Component({
  selector: 'app-areas-map',
  templateUrl: './areas-map.page.html',
  styleUrls: ['./areas-map.page.scss'],
})
export class AreasMapPage implements OnInit, AfterViewInit {
  @ViewChild(MapComponent) mapComp: MapComponent;
  user: User = {
    name: '',
    username: '',
    email: '',
    password: '',
    avatar: '',
    lat: 38.381783,
    lng: -0.778259,
  };

  areas: Area[] = [];

  constructor(
    private popoverCtrl: PopoverController,
    private areasService: AreasService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.usersService.getUser().subscribe((user) => {
      this.user = user;
    });

    this.areasService.getAreas().subscribe((ars) => {
      this.areas = this.areas.concat(ars);
    });
  }

  ionViewWillEnter() {

  }

  ngAfterViewInit() {
    this.mapComp.mapLoad.subscribe(() => {
      this.mapComp.mapInstance.resize(); // Necessary for full height map
    });
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
