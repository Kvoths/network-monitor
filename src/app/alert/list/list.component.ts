import { Component, OnInit } from '@angular/core';
import { Alert, AlertsService } from '../../services/alerts.service';
import { MatTableDataSource } from '@angular/material/table';

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
    private _alertsService: AlertsService
  ) { 
    
  }

  ngOnInit() {
    this._alertsService.getAllAlerts().subscribe(
      alerts => {
        this.alerts = alerts;
        this.dataSource = new MatTableDataSource(alerts);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchAlerts(text: string) {
    let alerts_filtered = this.alerts.filter( alert => alert._id.includes(text) || alert.name.includes(text) || alert.description.includes(text) || alert.min == +text || alert.max == +text );
    this.dataSource = new MatTableDataSource(alerts_filtered);
  }
}