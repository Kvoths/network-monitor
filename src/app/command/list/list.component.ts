import { Component, OnInit, Input } from '@angular/core';
import { Command, CronTime, CommandService } from '../../services/command.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component'

@Component({
  selector: 'command-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [CommandService]
})
export class ListComponent implements OnInit {
  public commands: Command[];
  public dataSource: MatTableDataSource<Command>;
  @Input() probe_id: string;

  constructor(
    private _commandService: CommandService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCommands();
  }

  openCreateCommand(): void {
    let dialogRef = this.dialog.open(CreateComponent, {
      width: 'auto',
      data: {}
    });

    dialogRef.componentInstance.probe_id = this.probe_id;

    dialogRef.afterClosed().subscribe(result => {
      this.getCommands();
    });
 
    
  }

  getIntervalTime(time: CronTime): string {
    let final_time = '';

    if (time.minute != '*') {
      final_time = `Cada ${time.minute.split('/')[1]} minuto/s`;
    } else if (time.hour != '*') {
      final_time = `Cada ${time.hour.split('/')[1]} hora/s`;
    } else if (time.dayMonth != '*') {
      final_time = 'Programación inválida';
    } else if (time.month != '*') {
      final_time = 'Programación inválida';
    } else if (time.dayWeek != '*') {
      final_time = 'Programación inválida';
    }

    return final_time;
  }

  toggleCommandActive(command: Command, event: any): void {
    command.active = (event.checked) ? true : false;
    this._commandService.updateCommand(command).subscribe(
      response => {
      },
      error => {
        console.error(error);
      }
    );
  }

  getCommands () {
    this._commandService.getCommandsByProbe(this.probe_id).subscribe(
      commands => {
        this.commands = commands;
        this.dataSource = new MatTableDataSource(commands);
      },
      error => {
        console.error(error);
      }
    );
  }
}
