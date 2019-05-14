import { Component, OnInit } from '@angular/core';
import { Probe, ProbesService } from '../../services/probes.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ProbesService]
})

export class CreateComponent implements OnInit {
  public formGroup: FormGroup;

  
  constructor(
    private _probesService: ProbesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]]
    });

    this.formGroup.valueChanges.subscribe(console.log);
  }

  get name() {
    return this.formGroup.get('name');
  }

  sendNewProbe () {
    if (this.formGroup.valid) {
      let probe: Probe;
      probe = {
        name: this.name.value,
        active: false
      };

      this._probesService.saveProbe(probe).subscribe(
        data => {
          console.log('Success');
        },
        error => {
          console.log(error);
        }
      );
    }
    console.log('hola');
  }
}
