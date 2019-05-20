import { Component, OnInit } from '@angular/core';
import { Command, CronTime, CommandService } from '../../services/command.service';
import { Probe, ProbesService } from '../../services/probes.service';
import { GeneralService } from '../../services/general.service';

import * as moment from 'moment';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
  providers: [CommandService]
})
export class ResultsListComponent implements OnInit {
  public commands: Command[];
  public start_date: moment.Moment;
  public end_date: moment.Moment;
  public labels: any[];
  public display_mode: string;
  public probes: Probe[];
  public selected_probe: string;

  constructor(
    private _commandService: CommandService,
    private _probesService: ProbesService,
    private _generalService: GeneralService
  ) { 
    this.display_mode = 'hour';
  }

  ngOnInit() {
    this._probesService.getAllProbes().subscribe(
      probes => {
        this.probes = probes;

        if (probes.length > 0) {
          this.selected_probe = probes[0]._id;
        }

        if (this.selected_probe !== '') {
          this.getCommands();
        }
      },
      error => {
        console.error(error);
      }
    );

    this.changeDisplayMode (this.display_mode);
  }

  changeDisplayMode (display_mode) {
    this.display_mode = display_mode;
    console.log(display_mode);
    switch (display_mode) {
      case 'week':
        this.start_date = moment().startOf('isoWeek');
        this.end_date = moment().endOf('isoWeek');
        this.labels = this._generalService.getDaysOfTheWeek(undefined);
        break;
      case 'day':
        this.start_date = moment().startOf('day');
        this.end_date = moment().endOf('day');
        this.labels = this._generalService.getHoursOfTheDay(undefined);
        break;
      case 'hour':
        this.start_date = moment().startOf('hour');
        this.end_date = moment().endOf('hour');
        this.labels = this._generalService.getMinutesOfTheHour(undefined);
        break;
    }
  }

  changeSelectedProbe() {
    this.getCommands();
  }

  getCommands() {
    this._commandService.getCommandsByProbe(this.selected_probe).subscribe(
      commands => {
        this.commands = commands;
      },
      error => {
        console.error(error);
      }
    );
  }
}
