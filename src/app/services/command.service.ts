import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';

export interface Parameter {
  _id?: string;
  name: string;
  value:string;
}

export interface CronTime {
  _id?: string;
  minute?: string;
  hour?: string;
  dayMonth?: string;
  month?: string;
  dayWeek?: string;
}

export interface Result {
  _id?: string;
  type: string;
  date: string;
  command: string;
  results: {
    duration: number;
    //ping
    min?: number;
    avg?: number;
    max?: number;
    mdev?: number;
    //tcpdump
    num_packets?: number;
    num_packets_per_secon?: number;
  };

}

export interface Command {
  _id?: string;
  name: string;
  parameters: Parameter[];
  time: CronTime;
  duration: number;
  probe: string;
  active: boolean;
  alert?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  public base_url: string;
  public url: string;
  public headers: {};

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { 
    this.base_url = 'https://localhost:3000/';
    this.url = 'https://localhost:3000/commands/';
    this.headers = { Authorization: `Bearer ${this._userService.getToken()}` };
  }

  getAllCommands () {
    return this._http.get<Command[]>(this.url, {
      headers: this.headers
    });
  }

  getCommandsByProbe (probe_id: string) {
    return this._http.get<Command[]>(this.base_url + 'probes/' + probe_id + '/commands', {
      headers: this.headers
    });
  }

  getAllCommandsResults () {
    return this._http.get<Result[]>(this.url + 'results', {
      headers: this.headers
    });
  }

  getCommandResults (command_id: string) {
    return this._http.get<Result[]>(this.url + command_id + '/results', {
      headers: this.headers
    });
  }

  getCommandResultsBetweenDates (command_id: string, start_date: any, end_date: any) {
    let paramsUrl = new HttpParams().append('start_date', start_date).append('end_date', end_date);

    return this._http.get<Result[]>(this.url + command_id + '/results/byDate', {
      params: paramsUrl,
      headers: this.headers
    });
  }

  getAvailableCommands () {
    return this._http.get<{name: string, value: string}[]>(this.url + 'availableTypes', {
      headers: this.headers
    });
  }

  saveCommand (command: Command) {
    return this._http.post<any>(this.url, command, {
      headers: this.headers
    });
  }

  updateCommand (command: Command) {
    return this._http.put<any>(this.url + command._id, command, {
      headers: this.headers
    });
  }
}
