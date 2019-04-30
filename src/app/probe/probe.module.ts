import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ProbeRoutingModule } from './probe-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';

@NgModule({
  declarations: [CreateComponent, ListComponent, ModifyComponent],
  imports: [
    CommonModule,
    CdkTableModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ProbeRoutingModule
  ]
})
export class ProbeModule { }
