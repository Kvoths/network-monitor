import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ModifyComponent } from './modify/modify.component';
import { ListComponent } from './list/list.component';

const probeRoutes: Routes = [
  { path: 'probe', component: ListComponent},
  { path: 'probe/new', component: CreateComponent}
  { path: 'probe/edit/:id', component: ModifyComponent}

];

@NgModule({
  imports: [RouterModule.forChild(probeRoutes)],
  exports: [RouterModule]
})
export class ProbeRoutingModule { }
