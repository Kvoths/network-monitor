import { Injectable } from '@angular/core';
//import {Response, Headers} from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface Param {
  name: string,
  value: any
}

export interface Probe {
  _id: string;
  name: string;
  ip: string;
  port: number;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class ProbesService {
  public url: string;

  constructor (
    private _http: HttpClient
  ) { 
    this.url = 'https://www.network-monitor.com:3000/probes/';
  }

  getProbeById (id: string) {
    return this._http.get<Probe>(this.url + id);
  }

  getAllProbes () {
    return this._http.get<Probe[]>(this.url);
  }

  searchProbes (params: Param[]) {
    let paramsUrl = new HttpParams();

    for (let param of params) {
      paramsUrl.set(param.name, param.value);
    }

    return this._http.get<Probe[]>(this.url);
  }

  saveProbe (probe: Probe) {
    return this._http.put<any>(this.url + probe._id, probe);
  }
}