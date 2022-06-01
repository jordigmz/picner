import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreasSavedPageRoutingModule } from './areas-saved-routing.module';

import { AreasSavedPage } from './areas-saved.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AreasSavedPageRoutingModule
  ],
  declarations: [AreasSavedPage]
})
export class AreasSavedPageModule {}
