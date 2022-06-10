import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AreasSavedPage } from './areas-saved.page';
import { RouterModule, Routes } from '@angular/router';
import { OrderByPipe } from '../pipes/order-by/order-by.pipe';
import { AreasFilterPipe } from '../pipes/areas-filter/areas-filter.pipe';

const routes: Routes = [
  {
    path: '',
    component: AreasSavedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AreasSavedPage,
    OrderByPipe,
    AreasFilterPipe
  ]
})
export class AreasSavedPageModule {}
