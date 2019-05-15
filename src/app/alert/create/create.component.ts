import { Component, OnInit } from '@angular/core';
import { Alert, AlertsService } from '../../services/alerts.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { max } from 'moment';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private _alertsService: AlertsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateComponent>
  ) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
      min: [0, [
        Validators.required,
        this.validateMinMax
      ]],
      max: [0, [
        Validators.required,
      ]],
    });

    this.formGroup.valueChanges.subscribe(console.log);
  }

  get name() {
    return this.formGroup.get('name');
  }

  get description() {
    return this.formGroup.get('description');
  }

  get min() {
    return this.formGroup.get('min');
  }

  get max() {
    return this.formGroup.get('max');
  }

  sendNewAlert () {

    if (this.formGroup.valid) {
      let alert: Alert;
      alert = {
        name: this.name.value,
        description: this.description.value,
        min: this.min.value,
        max: this.max.value,
      };

      this._alertsService.saveAlert(alert).subscribe(
        data => {
          console.log('Success');
          this.closeDialog();
        },
        error => {
          console.log(error);
        }
      );
    }
    console.log('hola');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  validateMinMax (control: AbstractControl) {
    console.log(control.value)
    if (this.formGroup && control) {
      if (control.value ) {
        return {min_max: true};
      }
    }

    return null;
  }

}
