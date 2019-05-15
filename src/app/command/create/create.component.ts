import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Command, Parameter, CronTime, CommandService } from '../../services/command.service';
import { Alert, AlertsService } from '../../services/alerts.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';

@Component({
  selector: 'command-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public available_commands : {name: string, value: string}[];
  public formGroup: FormGroup;
  public min: number;
  public max: number;
  public alerts: Alert[];
  @Input() probe_id: string;

  constructor(
    public dialogRef: MatDialogRef<CreateComponent>,
    private _commandService: CommandService,
    private _alertService: AlertsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.min = 1;
    this.max = 60; 
  }

  ngOnInit() {    
    //this.month = [{'name': 'Enero', 'value': 1}, {'name': 'Febrero', 'value': 2}, {'name': 'Marzo', 'value': 3}, {'name': 'Abril', 'value': 4}, {'name': 'Mayo','value': 5}, {'name': 'Junio','value': 6}, {'name': 'Julio','value': 7}, {'name': 'Agosto','value': 8}, {'name': 'Septiembre','value': 9}, {'name': 'Octubre','value': 10}, {'name': 'Noviembre','value': 11}, {'name': 'Diciembre','value': 12}];
    this._commandService.getAvailableCommands().subscribe(
      available_commands => {
        this.available_commands = available_commands;
      },
      error => {
        console.log(error);
      }
    );

    this._alertService.getAllAlerts().subscribe(
      alerts => {
        this.alerts = alerts;
      },
      error => {
        console.log(error);
      }
    );

    this.formGroup = this.formBuilder.group({
      selected_command: ['ping', [
        Validators.required
      ]],
      destiny: ['', [
        Validators.required
      ]],
      duration: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(60),
        //this.validateInteger
      ]],
      interval_number: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(60),
        //this.validateInteger
      ]],
      interval_time: ['minute', [
        Validators.required
      ]],
      command_alert: ''
    });

    this.formGroup.valueChanges.subscribe(console.log);

  }

  saveNewCommand() {

  }

  get selected_command() {
    return this.formGroup.get('selected_command');
  }

  get destiny() {
    return this.formGroup.get('destiny');
  }

  get duration() {
    return this.formGroup.get('duration');
  }

  get interval_number() {
    return this.formGroup.get('interval_number');
  }

  get interval_time() {
    return this.formGroup.get('interval_time');
  }

  get command_alert() {
    return this.formGroup.get('command_alert');
  }

  /*validateInteger (control: AbstractControl) {
    if (!Number.isInteger(control.value)) {
      return {invalidInteger: true}
    }

    return null;
  }*/

  changeIntervalTime() {
    if (this.interval_time.value == 'minute') {
      this.formGroup.controls['interval_number'].setValidators([Validators.max(59)]);
    } else if (this.interval_time.value == 'hour') {
      this.formGroup.controls['interval_number'].setValidators([Validators.max(24)]);
    }
  }

  sendNewCommand () {
    if (this.formGroup.valid) {
      let command: Command;
      let parameter: Parameter;
      let time: CronTime;


      if (this.selected_command.value == 'tcpdump') {
        parameter = {
          name: '-vv',
          value: ''
        };
      } else {
        parameter = {
          name: this.destiny.value,
          value: ''
        };
      }


      if (this.interval_time.value == 'minute') {
        time = {
          minute: '*/'+ this.interval_number.value
        };
      } else if (this.interval_time.value == 'hour') {
        time = {
          hour: '*/'+ this.interval_number.value
        };
      }

      command = {
        name : this.selected_command.value,
        parameters: [parameter],
        time: time,
        duration: this.duration.value,
        probe: this.probe_id,
        active: true
      };

      if (this.command_alert.value !== '') {
        command.alert = this.command_alert.value;

      }

      this._commandService.saveCommand(command).subscribe(
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
}
