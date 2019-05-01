import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ProbeRoutingModule } from './probe-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { CommandModule } from '../command/command.module';

@NgModule({
  declarations: [CreateComponent, ListComponent, ModifyComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    CommandModule,
    ProbeRoutingModule
  ]
})
export class ProbeModule { }
