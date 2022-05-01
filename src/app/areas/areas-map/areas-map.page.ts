import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MapComponent } from 'ngx-mapbox-gl';
import { Result } from 'ngx-mapbox-gl-geocoder-control';
import { StartNavigation } from '@proteansoftware/capacitor-start-navigation';

@Component({
  selector: 'app-areas-map',
  templateUrl: './areas-map.page.html',
  styleUrls: ['./areas-map.page.scss'],
})
export class AreasMapPage implements OnInit, AfterViewInit {
  @ViewChild(MapComponent) mapComp: MapComponent;
  lat = 38.4039418;
  lng = -0.5288701;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.mapComp.mapLoad.subscribe(
      () => {
        this.mapComp.mapInstance.resize(); // Necessary for full height
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
}
