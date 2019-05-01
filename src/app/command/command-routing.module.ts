import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

const commandRoutes: Routes = [
  { path: 'command', component: ListComponent}

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
