import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Probe, Param, ProbesService } from '../../services/probes.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'probe-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  public probe: Probe;
  public formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private _probesService: ProbesService,
    private formBuilder: FormBuilder
  ) { 
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this._probesService.getProbeById(id).subscribe(
      probe => {
        this.probe = probe;
        this.formGroup = this.formBuilder.group({
          name: [probe.name, [
            Validators.required
          ]],
          ip: [probe.ip, [
            Validators.required
          ]]
        });

        this.formGroup.valueChanges.subscribe(console.log);

      },
      error => {
        console.error(error);
      }
    );



  }

  get name() {
    return this.formGroup.get('name');
  }

  get ip() {
    return this.formGroup.get('ip');
  }

  updateProbe () {
    if (this.formGroup.valid) {
      let probe: Probe;
      probe = {
        _id: this.probe._id,
        name: this.name.value,
        ip: this.ip.value,
        active: false
      };

      this._probesService.updateProbe(probe).subscribe(
        probe => console.log(probe), 
        error => {
          console.error(error);
        }
      );
    }
  }
}
