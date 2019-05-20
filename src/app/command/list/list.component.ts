import { Component, OnInit, Input } from '@angular/core';
import { Command, CronTime, CommandService } from '../../services/command.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component'
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DeleteComponent } from '../delete/delete.component';

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
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
    ) { 
    iconRegistry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/edit.svg'));
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/delete.svg'));
  }

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

  openDeleteCommand (id: string) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      width: 'auto',
      data: {}
    });

    dialogRef.componentInstance.id = id;

    dialogRef.afterClosed().subscribe(result => {
      this.getCommands();
    });
  }
}
