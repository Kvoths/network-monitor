import { Component, OnInit } from '@angular/core';
import { Probe, ProbesService } from '../../services/probes.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ProbesService]
})
export class ListComponent implements OnInit {
  public probes: Probe[];
  public dataSource: MatTableDataSource<Probe>;

  constructor(
    private _probesService: ProbesService,
    public dialog: MatDialog
  ) { 
    
  }

  ngOnInit() {
    this._probesService.getAllProbes().subscribe(
      probes => {
        this.probes = probes;
        this.dataSource = new MatTableDataSource(probes);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchProbes(text: string) {
    let probes_filtered = this.probes.filter( probe => probe._id.includes(text) || probe.name.includes(text));
    this.dataSource = new MatTableDataSource(probes_filtered);
  }

  openCreateProbe() :void {
    let dialogRef = this.dialog.open(CreateComponent, {
      width: '1000px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
