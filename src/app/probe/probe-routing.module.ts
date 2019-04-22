import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';

const probeRoutes: Routes = [
  { path: 'probe', component: CreateComponent}

];

@NgModule({
  imports: [RouterModule.forChild(probeRoutes)],
  exports: [RouterModule]
})
export class ProbeRoutingModule { }
