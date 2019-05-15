import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { AlertRoutingModule } from './alert-routing.module';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [ListComponent, DeleteComponent, CreateComponent],
  imports: [
    CommonModule,
    AlertRoutingModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  entryComponents: [CreateComponent, DeleteComponent]
})
export class AlertModule { }
