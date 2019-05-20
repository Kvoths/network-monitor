import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Command, Parameter, CronTime, CommandService } from '../../services/command.service';
import { Alert, AlertsService } from '../../services/alerts.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import { CommandStringPipe } from 'app/pipes/command-string.pipe';

@Component({
  selector: 'command-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public available_commands : {name: string, value: string}[];
  public command : Command;
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
     this._commandService.getAvailableCommands(this.probe_id).subscribe(
      available_commands => {
        console.log(available_commands);
        this.available_commands = available_commands;
      },
      error => {
        console.error(error);
      }
    );

    this._alertService.getAllAlerts().subscribe(
      alerts => {
        this.alerts = alerts;
      },
      error => {
        console.error(error);
      }
    );

    let selected_command_default = (this.command !== undefined) ? this.command.name : 'ping';
    let destiny_default = (this.command !== undefined) ? this.command.destiny : '';
    let duration_default = (this.command !== undefined) ? this.command.duration : 1;
    let interval_number_default = (this.command !== undefined) ? this.cronValue(this.command.time).value : 1;
    let interval_time_default = (this.command !== undefined) ? this.cronValue(this.command.time).name : 'minute';
    let command_alert_default = (this.command !== undefined && this.command.alert !== undefined) ? this.command.alert : '';
    let disabled = (this.command !== undefined);

    this.formGroup = this.formBuilder.group({
      selected_command: [{value: selected_command_default, disabled: disabled}, Validators.required],
      destiny: [destiny_default, [
        Validators.required
      ]],
      duration: [duration_default, [
        Validators.required,
        Validators.min(1),
        Validators.max(60),
        //this.validateInteger
      ]],
      interval_number: [interval_number_default, [
        Validators.required,
        Validators.min(1),
        Validators.max(60),
        //this.validateInteger
      ]],
      interval_time: [interval_time_default, [
        Validators.required
      ]],
      command_alert: command_alert_default
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

  changeIntervalTime() {
    if (this.interval_time.value == 'minute') {
      this.formGroup.controls['interval_number'].setValidators([Validators.max(59)]);
    } else if (this.interval_time.value == 'hour') {
      this.formGroup.controls['interval_number'].setValidators([Validators.max(24)]);
    }
  }

  changeCommandType() {
    if (this.selected_command.value == 'tcpdump') {
      this.formGroup.controls['destiny'].setValidators(null);
      this.formGroup.controls['destiny'].setErrors(null);
    } else{
      this.formGroup.controls['destiny'].setValidators([Validators.required]);
    }

    this.formGroup.updateValueAndValidity();
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
        destiny : this.destiny.value,
        parameters: [parameter],
        time: time,
        duration: this.duration.value,
        probe: this.probe_id,
        active: true
      };

      if (this.command_alert.value !== '') {
        command.alert = this.command_alert.value;
      }

      if (this.command !== undefined) {
        console.log('si')
        command._id = this.command._id;
        this._commandService.updateCommand(command).subscribe(
          data => {
            this.closeDialog();
          },
          error => {
            console.error(error);
          }
        );
      } else {
        console.log('no')
        this._commandService.saveCommand(command).subscribe(
          data => {
            this.closeDialog();
          },
          error => {
            console.error(error);
          }
        );
      }

    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  cronValue (time: CronTime) {
    let final_time = {name: 'minute', value: 1};

    if (time.minute != '*') {
      final_time = {name: 'minute', value: +time.minute.split('/')[1]};
    } else if (time.hour != '*') {
      final_time = {name: 'hour', value: +time.hour.split('/')[1]};
    }

    return final_time;
  }
}
