import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { ProbeRoutingModule } from './probe-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ModifyComponent } from './modify/modify.component';
import { CommandModule } from '../command/command.module';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
  declarations: [CreateComponent, ListComponent, ModifyComponent, DeleteComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    CommandModule,
    ProbeRoutingModule,
    MatIconModule
  ],
  exports: [
  ],
  entryComponents: [CreateComponent, DeleteComponent]
})
export class ProbeModule { }
