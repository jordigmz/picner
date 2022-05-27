import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./areas-map/areas-map.module').then(m => m.AreasMapPageModule)
  },
  {
    path: 'add',
    loadChildren: () => import('./areas-form/areas-form.module').then(m => m.AreasFormPageModule)
  },
  {
    path: 'details/:id',
    loadChildren: () => import('./areas-details/areas-details.module').then(m => m.AreasDetailsPageModule)
  },
  {
    path: ':id/edit',
    loadChildren: () => import('./areas-form/areas-form.module').then(m => m.AreasFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasRoutingModule {}
