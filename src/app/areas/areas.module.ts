import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgxMapboxGlGeocoderControlModule } from 'ngx-mapbox-gl-geocoder-control';
import { AreasRoutingModule } from './areas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreasRoutingModule,
    NgxMapboxGLModule,
    NgxMapboxGlGeocoderControlModule
  ],
  declarations: [],
})
export class AreasModule {}
