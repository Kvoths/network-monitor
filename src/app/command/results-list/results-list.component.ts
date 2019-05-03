import { Component, OnInit } from '@angular/core';
import { Command, CommandService } from '../../services/command.service';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
  providers: [CommandService]
})
export class ResultsListComponent implements OnInit {
  public commands: Command[];

  constructor(
    private _commandService: CommandService
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
  }
}
