import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AreasSavedPage } from './areas-saved.page';

const routes: Routes = [
  {
    path: '',
    component: AreasSavedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasSavedPageRoutingModule {}
