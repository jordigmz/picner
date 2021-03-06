import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgxMapboxGlGeocoderControlModule } from 'ngx-mapbox-gl-geocoder-control';
import { LeavePageGuard } from 'src/app/guards/leave-page.guard';
import { AreasFormPage } from './areas-form.page';

const routes: Routes = [
  {
    path: '',
    component: AreasFormPage,
    canDeactivate: [LeavePageGuard]
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
  declarations: [AreasFormPage]
})
export class AreasFormPageModule {}
