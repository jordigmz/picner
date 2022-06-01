import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { Result } from 'ngx-mapbox-gl-geocoder-control';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';
import { HeaderPopoverComponent } from 'src/app/components/header-popover/header-popover.component';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { AreasService } from '../services/areas.service';
import { Area } from '../interfaces/areas';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/users.service';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-areas-map',
  templateUrl: './areas-map.page.html',
  styleUrls: ['./areas-map.page.scss'],
})
export class AreasMapPage implements OnInit, AfterViewInit {
  @ViewChild(MapComponent) mapComp: MapComponent;
  lat = 38.381783;
  lng = -0.778259;

  user: User = {
    name: '',
    username: '',
    email: '',
    password: '',
    avatar: '',
    lat: 38.381783,
    lng: -0.778259
  };

  areas: Area[] = [];

  constructor(
    private popoverCtrl: PopoverController,
    private areasService: AreasService,
    private authService: AuthService,
    private usersService: UsersService,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.usersService.getUser().subscribe((user) => {
      this.user = user;
    });

    this.areasService.getAreas().subscribe((ars) => {
      this.areas = this.areas.concat(ars);
    });
  }

  ngAfterViewInit() {
    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize(); // Necessary for full height map
      }
    );
  }

  alert() {
    alert('Foo');
  }

  async openPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: HeaderPopoverComponent,
      cssClass: 'headerPopover',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
