import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { Result } from 'ngx-mapbox-gl-geocoder-control';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';
import { HeaderPopoverComponent } from 'src/app/components/header-popover/header-popover.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-areas-map',
  templateUrl: './areas-map.page.html',
  styleUrls: ['./areas-map.page.scss'],
})
export class AreasMapPage implements OnInit, AfterViewInit {
  @ViewChild(MapComponent) mapComp: MapComponent;
  lat = 38.4039418;
  lng = -0.5288701;

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize(); // Necessary for full height map
      }
    );
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
