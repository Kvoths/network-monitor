import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { headersToString } from 'selenium-webdriver/http';

export interface Alert {
  _id?: string;
  name: string;
  description: string;
  min: number;
  max: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  public url: string;
  public headers: {};

  constructor(
    private _http: HttpClient,
    private _userService: UserService
  ) { 
    this.url = 'https://localhost:3000/alerts/';
    this.headers = { Authorization: `Bearer ${this._userService.getToken()}` };
  }

  getAlertById (id: string) {
    return this._http.get<Alert>(this.url + id, {
        headers: this.headers
    });
  }

  getAllAlerts () {
    return this._http.get<Alert[]>(this.url, {
        headers: this.headers
    });
  }

  saveAlert (alert: Alert) {
    return this._http.post<any>(this.url, alert, {
      headers: this.headers
    });
  }

  updateAlert (alert: Alert) {
    return this._http.put<any>(this.url + alert._id, alert, {
      headers: this.headers
    });
  }

  deleteAlert (id: string) {
    return this._http.delete<any>(this.url + id, {
      headers: this.headers
    });
  }
}
