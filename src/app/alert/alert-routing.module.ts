import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AuthGuardService } from '../services/auth-guard.service';

const alertRoutes: Routes = [
  { path: 'alert', component: ListComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(alertRoutes)],
  exports: [RouterModule]
})
export class AlertRoutingModule { }
