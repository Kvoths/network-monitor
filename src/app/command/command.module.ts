import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CommandRoutingModule } from './command-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { ResultsChartComponent } from './results-chart/results-chart.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    ChartsModule,
    CommandRoutingModule
  ],
  providers:[DatePipe],
  declarations: [CreateComponent, ListComponent, ResultsListComponent, ResultsChartComponent],
  exports: [CreateComponent, ListComponent],
  entryComponents: [CreateComponent]
})
export class CommandModule { }
