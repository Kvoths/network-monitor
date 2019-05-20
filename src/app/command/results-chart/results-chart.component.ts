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
  public labelString: string;
 // public barChartData: [{ data: number[]; label: string; }];
 

  constructor(
    private _commandService: CommandService,
    private _generalService: GeneralService
  ) {
    this.now = moment();
    this.timeFormat = 'DD/MM/YYYY HH:mm:ss';
    this.barChartType = 'line';
    //this.barChartLegend = true;

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.loadDates();
  }

  ngOnInit() {
    this.loadDates();

    switch (this.command.name) {
      case 'ping':
        this.labelString = 'Round-trip time (RTT)';
        break;
      case 'tcpdump':
        this.labelString = 'Número de paquetes';
        break;
      case 'iperf':
        this.labelString = 'Round-trip time (RTT)';
        break;
    }

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
              labelString: this.labelString
          },
          ticks: {
            min: 0
          }
        }]
      }
    };
  }

  loadDates () {
    this.nowPlusOne = moment(this.start_date).add(1, this.display_mode as moment.unitOfTime.DurationConstructor);
    this._commandService.getCommandResultsBetweenDates(this.command._id, this.start_date.toISOString(), this.end_date.toISOString()).subscribe(
      results => {
        this.results = results;

        switch (this.command.name) {
          case 'ping':
            this.setPing(results);
            break;
          case 'tcpdump':
            this.setTcpdump(results);
            break;
        }
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

  setPing (results: Result[]) {
    let ymin, yavg, ymax;
    let datamin : any[] = [], dataavg : any[] = [], datamax : any[] = [];
    this.labelString = 'Round-trip time (RTT)';


    for (let result of results) {
      let t = moment(result.date).format(this.timeFormat);
      ymin = result.results.min;
      yavg = result.results.avg;
      ymax = result.results.max;

      datamin.push({
        t: t,
        y: ymin
      });

      dataavg.push({
        t: t,
        y: yavg
      });

      datamax.push({
        t: t,
        y: ymax
      });
    }

    this.barChartData = [
      {data: datamin, label: 'RTT mínimo', fill: false},
      {data: dataavg, label: 'RTT medio', fill: false},
      {data: datamax, label: 'RTT máximo', fill: false}
    ];
  }

  setTcpdump (results: Result[]) {
    let y;
    let data : any[] = [];

    for (let result of results) {
      let t = moment(result.date).format(this.timeFormat);
      y = result.results.num_packets_per_secon;

      data.push({
        t: t,
        y: y
      });
    }

    this.barChartData = [
      {data: data, label: 'Número de paquetes por segundo', fill: false}
    ];
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
