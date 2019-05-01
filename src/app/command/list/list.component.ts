import { Component, OnInit, Input } from '@angular/core';
import { Command, CommandService } from '../../services/command.service';
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
    this._commandService.getCommandsByProbe(this.probe_id).subscribe(
      commands => {
        this.commands = commands;
        this.dataSource = new MatTableDataSource(commands);
      },
      error => {
        console.log(error);
      }
    );
  }

  openCreateCommand(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '1000px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
 
    
  }
}
