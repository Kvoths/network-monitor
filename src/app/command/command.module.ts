import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommandRoutingModule } from './command-routing.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    CommandRoutingModule
  ],
  declarations: [CreateComponent],
})
export class CommandModule { }
