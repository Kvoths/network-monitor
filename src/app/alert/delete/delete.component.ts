import { Component, OnInit, Input } from '@angular/core';
import { AlertsService } from '../../services/alerts.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() id: string;

  constructor(
    private _alertsService: AlertsService,
    public dialogRef: MatDialogRef<DeleteComponent>
  ) { }

  ngOnInit() {
  }

  deleteAlert () {
    this._alertsService.deleteAlert(this.id).subscribe(
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
