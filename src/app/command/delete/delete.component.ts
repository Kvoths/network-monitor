import { Component, OnInit, Input } from '@angular/core';
import { CommandService } from '../../services/command.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() id: string;

  constructor(
    private _commandService: CommandService,
    public dialogRef: MatDialogRef<DeleteComponent>
  ) { }

  ngOnInit() {
  }

  deleteCommand () {
    this._commandService.deleteCommand(this.id).subscribe(
      result => {
        this.closeDialog();
      },
      error => {
        console.error(error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
