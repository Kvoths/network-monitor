import { Component, OnInit } from '@angular/core';
import { Probe, ProbesService } from '../../services/probes.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component'
import { DeleteComponent } from '../delete/delete.component'
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

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
    this.getProbes();
  }

  searchProbes(text: string) {
    let probes_filtered = this.probes.filter( probe => probe._id.includes(text) || probe.name.includes(text));
    this.dataSource = new MatTableDataSource(probes_filtered);
  }

  openCreateProbe() :void {
    let dialogRef = this.dialog.open(CreateComponent, {
      width: 'auto',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProbes();
    });
  }

  openDeleteProbe(id: string) :void {
    let dialogRef = this.dialog.open(DeleteComponent, {
      width: 'auto',
      data: {}
    });

    dialogRef.componentInstance.id = id;

    dialogRef.afterClosed().subscribe(result => {
      this.getProbes();
    });
  }

  getProbes () {
    this._probesService.getAllProbes().subscribe(
      probes => {
        this.probes = probes;
        this.dataSource = new MatTableDataSource(probes);
      },
      error => {
        console.error(error);
      }
    );
  }
}
