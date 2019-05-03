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
  @Input() barChartLabels: any[];
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
    this.loadDates();
  }

  loadDates () {
    this._commandService.getCommandResultsBetweenDates(this.command._id, this.start_date.toISOString(), this.end_date.toISOString()).subscribe(
      results => {
        console.log(results);
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
          /*data
          {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
          {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
        ];*/
        }
        this.barChartData = [
          {data: data, label: 'Series A', fill: false}
        ];
        /*this.barChartData = [{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
          {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
        ];*/
      },
      error => {
        console.log(error);
      }
    );
  }

  goBefore () {
    console.log('Start date1: ' + this.start_date.toISOString());
    console.log('End date1: ' + this.end_date.toISOString());
    this.start_date.subtract(1, 'week').startOf('isoWeek');
    this.end_date.subtract(1, 'week').endOf('isoWeek');
    this.barChartLabels = this._generalService.getDaysOfTheWeek(this.start_date);
    this.loadDates();
    console.log('Start date2: ' + this.start_date.toISOString());
    console.log('End date2: ' + this.end_date.toISOString());
  }

  goAfter () {
    console.log('Start date1: ' + this.start_date.toISOString());
    console.log('End date1: ' + this.end_date.toISOString());
    this.start_date = this.start_date.add(1, 'week');
    this.end_date = this.end_date.add(1, 'week');
    this.barChartLabels = this._generalService.getDaysOfTheWeek(this.start_date);
    this.loadDates();
    console.log('Start date2: ' + this.start_date.toISOString());
    console.log('End date2: ' + this.end_date.toISOString());
  }
}
