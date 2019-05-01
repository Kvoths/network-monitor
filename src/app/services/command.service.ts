import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Parameter {
  _id: string;
  name: string;
  value:string;
}

export interface CronTime {
  _id: string;
  minute: string;
  hour: string;
  dayMonth: string;
  month: string;
  dayWeek: string;
}

export interface Command {
  _id: string;
  parameters: Parameter[];
  time: CronTime;
  duration: number;
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
    console.log('hola');
    console.log(probe_id);
    let paramsUrl = new HttpParams().append('probe_id', probe_id);
    return this._http.get<Command[]>(this.url + 'byProbe', {
      params: paramsUrl
    });
  }
}
