import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { CommandRoutingModule } from './command-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ResultsListComponent } from './results-list/results-list.component';
import { ResultsChartComponent } from './results-chart/results-chart.component';
import { ResultChartDirective } from './results-list/result-chart.directive';
@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ChartsModule,
    CommandRoutingModule,

  ],
  providers:[DatePipe],
  declarations: [CreateComponent, ListComponent, ResultsListComponent, ResultsChartComponent, ResultChartDirective],
  exports: [CreateComponent, ListComponent],
  entryComponents: [CreateComponent, ResultsChartComponent]
})
export class CommandModule { }
