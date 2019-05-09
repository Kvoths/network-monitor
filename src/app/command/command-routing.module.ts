import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ResultsListComponent } from './results-list/results-list.component';
//Servicio para proteger la url contra usuarios no logueados
import { AuthGuardService } from '../services/auth-guard.service';

const commandRoutes: Routes = [
  { path: 'command', component: ListComponent, canActivate: [AuthGuardService] },
  { path: 'results_list', component: ResultsListComponent, canActivate: [AuthGuardService] }

];

@NgModule({
  imports: [
    RouterModule.forChild(commandRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class CommandRoutingModule { }
