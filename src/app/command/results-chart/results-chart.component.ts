import { Component, OnInit, Input } from '@angular/core';
import { Command, Result, CommandService } from '../../services/command.service';
import { GeneralService } from '../../services/general.service';
import * as moment from 'moment';

@Component({
  selector: 'app-results-chart',
  templateUrl: './results-chart.component.html',
  styleUrls: ['./results-chart.component.scss']
})
export class ResultsChartComponent implements OnInit {
  public results: Result[];
  @Input() command: Command;
  @Input() start_date: moment.Moment;
  @Input() end_date: moment.Moment;
  public barChartLabels: any[];
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData: any[];
  public barChartOptions: any;
  public timeFormat: string;
 // public barChartData: [{ data: number[]; label: string; }];
 

  constructor(
    private _commandService: CommandService,
    private _generalService: GeneralService
  ) {
    this.timeFormat = 'DD/MM/YYYY HH:mm:ss';
    this.barChartType = 'line';
    //this.barChartLegend = true;

    this.barChartOptions = {
      elements: {
        line: {
            tension: 0
        }
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            parser: this.timeFormat,
            tooltipFormat: 'll HH:mm:ss',
            displayFormats: {
              'millisecond': 'll',
              'second': 'll',
              'minute': 'll',
              'hour': 'll',
              'day': 'll',
              'week': 'll',
              'month': 'll',
              'quarter': 'll',
              'year': 'll',
           }
          },
          ticks: {
            source: 'labels'
          },
          scaleLabel: {
            display: true,
            labelString: 'Fecha'
          }
        }],
        yAxes: [{
          scaleLabel: {
              display: true,
              labelString: 'Milisegundos'
          }
        }]
      }
    };
  }

  ngOnInit() {
    this.barChartLabels = this._generalService.getDaysOfTheWeek();
    this._commandService.getCommandResults(this.command._id).subscribe(
      results => {
        this.results = results;
        let data : any[];
        data = [];

        for (let result of results) {
          data.push(
            {
              t: moment(result.date).format(this.timeFormat),
              y: result.results.avg
            }
          );
        }
        this.barChartData = [
          {data: data, label: 'Series A', fill: false}
        ];
      },
      error => {
        console.log(error);
      }
    );
  }
}
