import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
}

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  public url: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = 'https://www.network-monitor.com:3000/commands/';
  }

  getAllCommands () {
    return this._http.get<Command[]>(this.url);
  }

  getCommandsByProbe (probe_id: string) {
    let paramsUrl = new HttpParams().append('probe_id', probe_id);
    return this._http.get<Command[]>(this.url + 'byProbe', {
      params: paramsUrl
    });
  }

  getAllCommandsResults () {
    return this._http.get<Result[]>(this.url + 'results');
  }

  getCommandResults (command_id: string) {
    return this._http.get<Result[]>(this.url + command_id + '/results');
  }

  getCommandResultsBetweenDates (command_id: string, start_date: any, end_date: any) {
    let paramsUrl = new HttpParams().append('start_date', start_date).append('end_date', end_date);

    return this._http.get<Result[]>(this.url + command_id + '/results/byDate', {
      params: paramsUrl
    });
  }

  getAvailableCommands () {
    return this._http.get<{name: string, value: string}[]>(this.url + 'availableTypes');
  }

  saveCommand (command: Command) {
    return this._http.post<any>(this.url, command);
  }
}
