import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ValidatorsModule } from 'src/app/validators/validators.module';
import { RegisterPage } from './register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidatorsModule,
    RouterModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
