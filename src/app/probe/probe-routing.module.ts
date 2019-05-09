import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';
import { AuthGuardService } from '../services/auth-guard.service';

const probeRoutes: Routes = [
  { path: 'probe', component: ListComponent, canActivate: [AuthGuardService] },
  { path: 'probe/new', component: CreateComponent, canActivate: [AuthGuardService] },
  { path: 'probe/edit/:id', component: ModifyComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(probeRoutes)],
  exports: [RouterModule]
})
export class ProbeRoutingModule { }
