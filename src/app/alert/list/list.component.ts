import { Component, OnInit } from '@angular/core';
import { Alert, AlertsService } from '../../services/alerts.service';
import { MatTableDataSource } from '@angular/material/table';
import { CreateComponent } from '../create/create.component'
import { DeleteComponent } from '../delete/delete.component'
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [AlertsService]
})
export class ListComponent implements OnInit {
  public alerts: Alert[];
  public dataSource: MatTableDataSource<Alert>;

  constructor(
    private _alertsService: AlertsService,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer
  ) { 
    iconRegistry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icons/delete.svg'));
  }

  ngOnInit() {
    this.getAlerts();
  }

  searchAlerts(text: string) {
    let alerts_filtered = this.alerts.filter( alert => alert._id.includes(text) || alert.name.includes(text) || alert.description.includes(text) || alert.min == +text || alert.max == +text );
    this.dataSource = new MatTableDataSource(alerts_filtered);
  }

  openCreateAlert() :void {
    let dialogRef = this.dialog.open(CreateComponent, {
      width: '1000px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAlerts();
    });
  }

  openDeleteAlert(id: string) :void {
    let dialogRef = this.dialog.open(DeleteComponent, {
      width: '1000px',
      data: {}
    });
    console.log('hola');
    console.log(id);
    
    dialogRef.componentInstance.id = id;

    dialogRef.afterClosed().subscribe(result => {
      this.getAlerts();
    });
  }

  getAlerts () {
    this._alertsService.getAllAlerts().subscribe(
      alerts => {
        this.alerts = alerts;
        this.dataSource = new MatTableDataSource(alerts);
        console.log(alerts)
      },
      error => {
        console.log(error);
      }
    );
  }
}