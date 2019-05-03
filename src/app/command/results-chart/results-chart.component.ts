import { Component, OnInit, Input } from '@angular/core';
import { Command, Result, CommandService } from '../../services/command.service';
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
    private _commandService: CommandService
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

  getDaysOfMonth():any[] {
    let totalNumberDaysInMonth = moment().daysInMonth();
    let day = 1;
    let arrDays = [];
  
    while(day <= totalNumberDaysInMonth) {
      let current = moment().date(day);
      current.set({h: 0, m: 0, s: 0});
      arrDays.push(current.toDate());
      day++;
    }
  
    return arrDays;
  }
 
  getDaysOfTheWeek():any[] {
    let totalNumberDaysInWeek = 6;
    let day = 0;
    let arrDays = [];
  
    while(day <= totalNumberDaysInWeek) {
      let current = moment().day(day);
      current.set({h: 0, m: 0, s: 0});
      arrDays.push(current.toDate());
      day++;
    }
  
    return arrDays;
  }
}
