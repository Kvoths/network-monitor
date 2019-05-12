import { Component, OnInit } from '@angular/core';
import { Probe, ProbesService } from '../../services/probes.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

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
      },
      error => {
        console.log(error);
      }
    );
  }

  searchProbes(text: string) {
    let probes_filtered = this.probes.filter( probe => probe._id.includes(text) || probe.name.includes(text) || probe.ip.includes(text) || probe.port == +text );
    this.dataSource = new MatTableDataSource(probes_filtered);
  }
}
