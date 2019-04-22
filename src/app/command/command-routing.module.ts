import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './create/create.component';

const commandRoutes: Routes = [
  { path: 'command', component: CreateComponent}

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
