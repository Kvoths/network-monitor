import { Component, OnInit } from '@angular/core';
import { Probe, ProbesService } from '../../services/probes.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

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
    private _probesService: ProbesService
  ) { 
    
  }

  ngOnInit() {
    this._probesService.getAllProbes().subscribe(
      probes => {
        this.probes = probes;
        this.dataSource = new MatTableDataSource(probes);
        console.log(this.dataSource);
      },
      error => {
        console.log(error);
      }
    );
  }
}