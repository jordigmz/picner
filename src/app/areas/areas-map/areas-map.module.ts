import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgxMapboxGlGeocoderControlModule } from 'ngx-mapbox-gl-geocoder-control';
import { HeaderPopoverComponent } from 'src/app/components/header-popover/header-popover.component';
import { MenuTabComponent } from 'src/app/components/menu-tab/menu-tab.component';
import { AreasMapPage } from './areas-map.page';

const routes: Routes = [
  {
    path: '',
    component: AreasMapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxMapboxGLModule,
    NgxMapboxGlGeocoderControlModule
  ],
  declarations: [AreasMapPage, MenuTabComponent, HeaderPopoverComponent]
})
export class AreasMapPageModule {}
