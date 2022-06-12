import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { ValidatorsModule } from 'src/app/validators/validators.module';
import { NameModalComponent } from './modal/name-modal/name-modal/name-modal.component';
import { PasswordModalComponent } from './modal/password-modal/password-modal/password-modal.component';
import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidatorsModule,
    RouterModule.forChild(routes),
    NgxMapboxGLModule
  ],
  declarations: [ProfilePage, NameModalComponent, PasswordModalComponent]
})
export class ProfilePageModule {}
