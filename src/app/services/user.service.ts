import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface User {
  _id?: string;
  name?: string;
  mail: string;
  password: string;
}

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

export interface Token {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public token: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = 'https://localhost:3000/';
  }

  login (user: User) {
    return this._http.post<Token>(this.url + 'login', user).subscribe(
      token => {
        this.saveToken (token.token);
      },
      error => {
        console.log(error);
      }
    );
  }

  register (user: User) {
    return this._http.post<Token>(this.url + 'register', user).subscribe(
      token => {
        this.saveToken (token.token);
      },
      error => {
        console.log(error);
      }
    );
  }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  public getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public logout() {
    this.token = '';
    window.localStorage.removeItem('token');
    //this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
