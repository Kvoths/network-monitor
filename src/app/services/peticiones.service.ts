import { Injectable } from '@angular/core';
//import {Response, Headers} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  public url: string;

  constructor (private _http:HttpClient) { 
    this.url = 'https://www.network-monitor.com:3000/probes/';
  }
  
  getPrueba () {
    return 'Hola asdf';    
  }

  getProbes () {
    return this._http.get(this.url);
  }
}