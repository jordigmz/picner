import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { Result } from 'ngx-mapbox-gl-geocoder-control';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';
import { HeaderPopoverComponent } from 'src/app/components/header-popover/header-popover.component';
import { AlertController, PopoverController } from '@ionic/angular';
import { AreasService } from '../services/areas.service';
import { Area } from '../interfaces/areas';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-areas-map',
  templateUrl: './areas-map.page.html',
  styleUrls: ['./areas-map.page.scss'],
})
export class AreasMapPage implements OnInit, AfterViewInit {
  @ViewChild(MapComponent) mapComp: MapComponent;
  lat = 38.4039418;
  lng = -0.5288701;

  areas: Area[] = [];

  constructor(
    private popoverCtrl: PopoverController,
    private areasService: AreasService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize(); // Necessary for full height map
      }
    );
  }

  ionViewWillEnter() {
    /*this.areasService
      .getAreas()
      .subscribe((ars) => (this.areas = ars));

      console.log(this.areas);*/
    this.areas = [
      {
        id: '628e0dc22dc11d3037d7d3df',
        name: 'Mi area 1',
        description: 'Descripción del area 1',
        image: 'imagen1.jpg',
        lat: 3.09876,
        lng: 0.32456,
        address: 'Dirección del area 1',
        visibility: 0
      },
      {
        id: '628e0dd12dc11d3037d7d3e1',
        name: 'Mi area 2',
        description: 'Descripción del area 2',
        image: 'imagen2.jpg',
        lat: 3.09876,
        lng: 0.32456,
        address: 'Dirección del area 2',
        visibility: 1
      },
  ];
  }

  startNavigation() {
    StartNavigation.launchMapsApp({
      latitude: this.lat,
      longitude: this.lng,
      name: 'Directions example',
    });
  }

  changePosition(result: Result) {
    this.lat = result.geometry.coordinates[1];
    this.lng = result.geometry.coordinates[0];
    console.log('New address: ' + result.place_name);
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
