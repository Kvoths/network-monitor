import { Component, OnInit, Input } from '@angular/core';
import { ProbesService } from '../../services/probes.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() id: string;

  constructor(
    private _probesService: ProbesService,
    public dialogRef: MatDialogRef<DeleteComponent>
  ) {

  }

  ngOnInit() {
  }

  deleteProbe () {
    this._probesService.deleteProbe(this.id).subscribe(
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
