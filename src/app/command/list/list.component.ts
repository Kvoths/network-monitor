import { Component, OnInit } from '@angular/core';
import { Command, CommandService } from '../../services/command.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [CommandService]
})
export class ListComponent implements OnInit {
  public commands: Command[];
  public dataSource: MatTableDataSource<Command>;

  constructor(
    private _commandService: CommandService
  ) { }

  ngOnInit() {
    this._commandService.getAllCommands().subscribe(
      commands => {
        this.commands = commands;
        this.dataSource = new MatTableDataSource(commands);
        console.log(this.commands);
        console.log(this.dataSource);
      },
      error => {
        console.log(error);
      }
    );
  }

}
