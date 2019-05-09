import { Injectable } from '@angular/core';
//import {Response, Headers} from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { headersToString } from 'selenium-webdriver/http';

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
  public headers: {};

  constructor (
    private _http: HttpClient,
    private _userService: UserService
  ) { 
    this.url = 'https://localhost:3000/probes/';
    this.headers = { Authorization: `Bearer ${this._userService.getToken()}` };
  }

  getProbeById (id: string) {
    return this._http.get<Probe>(this.url + id, {
        headers: this.headers
    });
  }

  getAllProbes () {
    return this._http.get<Probe[]>(this.url, {
        headers: this.headers
    });
  }

  searchProbes (params: Param[]) {
    let paramsUrl = new HttpParams();

    for (let param of params) {
      paramsUrl.set(param.name, param.value);
    }

    return this._http.get<Probe[]>(this.url, {
        headers: this.headers
    });
  }

  saveProbe (probe: Probe) {
    return this._http.put<any>(this.url + probe._id, probe, {
      headers: this.headers
    });
  }
}