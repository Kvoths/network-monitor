import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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
  private _start_date: moment.Moment;
  private _end_date: moment.Moment;
  @Input() barChartLabels: any[];
  private _display_mode: string;
  public barChartType: string;
  public barChartLegend: boolean;
  public barChartData: any[];
  public barChartOptions: any;
  public timeFormat: string;
  public now: moment.Moment;
  public nowPlusOne: moment.Moment;
 // public barChartData: [{ data: number[]; label: string; }];
 

  constructor(
    private _commandService: CommandService,
    private _generalService: GeneralService
  ) {
    this.now = moment();
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
              'minute': 'll HH:mm',
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
          },
          ticks: {
            min: 0
          }
        }]
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.loadDates();
  }

  ngOnInit() {
    this.loadDates();
  }

  loadDates () {
    this.nowPlusOne = moment(this.start_date).add(1, this.display_mode as moment.unitOfTime.DurationConstructor);
    this._commandService.getCommandResultsBetweenDates(this.command._id, this.start_date.toISOString(), this.end_date.toISOString()).subscribe(
      results => {
        this.results = results;
        let data : any[];
        data = [];
        let y: number;
        
        for (let result of results) {
          switch (this.command.name) {
            case 'ping':
              y = result.results.avg
              break;
            case 'tcpdump':
              y = result.results.num_packets_per_secon
              break;
          }
          data.push(
            {
              t: moment(result.date).format(this.timeFormat),
              y: y
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
        console.error(error);
      }
    );
  }

  goBefore () {
    console.log(this.display_mode);
    this.start_date.subtract(1, this.display_mode as moment.unitOfTime.DurationConstructor);
    this.end_date.subtract(1, this.display_mode as moment.unitOfTime.DurationConstructor);

    switch (this.display_mode) {
      case 'week':
      this.barChartLabels = this._generalService.getDaysOfTheWeek(this.start_date);
      break;
    case 'day':
      this.barChartLabels = this._generalService.getHoursOfTheDay(this.start_date);
      break;
    case 'hour':
      this.barChartLabels = this._generalService.getMinutesOfTheHour(this.start_date);
      break;
    }

    this.loadDates();
  }

  goAfter () {
    console.log(this.display_mode);
    this.start_date = this.start_date.add(1, this.display_mode as moment.unitOfTime.DurationConstructor);
    this.end_date = this.end_date.add(1, this.display_mode as moment.unitOfTime.DurationConstructor);

    switch (this.display_mode) {
      case 'week':
      this.barChartLabels = this._generalService.getDaysOfTheWeek(this.start_date);
      break;
    case 'day':
      this.barChartLabels = this._generalService.getHoursOfTheDay(this.start_date);
      break;
    case 'hour':
      this.barChartLabels = this._generalService.getMinutesOfTheHour(this.start_date);
      break;
    }

    this.loadDates();
  }

  get start_date(): moment.Moment {
    return this._start_date;
  }

  get end_date(): moment.Moment {
    return this._end_date;
  }

  get display_mode(): string {
    return this._display_mode
  }
  
  @Input()
  set start_date(start_date: moment.Moment) {
    this._start_date = start_date;
  }

  @Input()
  set end_date(end_date: moment.Moment) {
    this._end_date = end_date;
  }

  @Input()
  set display_mode(display_mode: string) {
    this._display_mode = display_mode;
  }
}
