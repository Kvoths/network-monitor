import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProbeRoutingModule } from './probe-routing.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    ProbeRoutingModule
  ]
})
export class ProbeModule { }
