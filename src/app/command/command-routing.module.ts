import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { ResultsListComponent } from './results-list/results-list.component';

const commandRoutes: Routes = [
  { path: 'command', component: ListComponent},
  { path: 'results_list', component: ResultsListComponent}

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
