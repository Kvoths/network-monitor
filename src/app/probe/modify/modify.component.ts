import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Probe, Param, ProbesService } from '../../services/probes.service';

@Component({
  selector: 'probe-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  public probe: Probe;

  constructor(
    private route: ActivatedRoute,
    private _probesService: ProbesService
  ) { 
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this._probesService.getProbeById(id).subscribe(
      probe => this.probe = probe, 
      error => {
        console.log(error);
      }
    );
  }

  saveProbe () {
    this._probesService.saveProbe(this.probe).subscribe(
      probe => console.log(probe), 
      error => {
        console.log(error);
      }
    );
  }

}
