import { Component, OnInit } from '@angular/core';
import { Command, CommandService } from '../../services/command.service';
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
  constructor(
    private _commandService: CommandService,
    private _generalService: GeneralService
  ) { }

  ngOnInit() {
    this._commandService.getAllCommands().subscribe(
      commands => {
        this.commands = commands;
      },
      error => {
        console.log(error);
      }
    );
    this.labels = this._generalService.getDaysOfTheWeek(undefined);
    this.start_date = moment().startOf('isoWeek');
    this.end_date = moment().endOf('isoWeek');
  }
}
