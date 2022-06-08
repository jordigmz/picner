import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeavePageGuard } from '../guards/leave-page.guard';
import { AreaIdGuard } from './guards/area-id.guard';

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
    loadChildren: () => import('./areas-details/areas-details.module').then(m => m.AreasDetailsPageModule),
    canActivate: [AreaIdGuard]
  },
  {
    path: ':id/edit',
    loadChildren: () => import('./areas-form/areas-form.module').then(m => m.AreasFormPageModule),
    canActivate: [AreaIdGuard]
  },
  {
    path: 'guardado',
    loadChildren: () => import('./areas-saved/areas-saved.module').then( m => m.AreasSavedPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AreasRoutingModule {}
