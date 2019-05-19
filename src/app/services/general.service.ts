import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { 

  }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      switch (error.status) {
        case 400:
          //Datos incorrectos
          console.log('400')
          break;
        case 401:
          //Datos incorrectos
          console.log('401')
          break;
        case 404:
          //Datos incorrectos
          console.log('404')
          break;
        case 500:
          console.log('500')
          break;
      }
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  getDaysOfMonth():any[] {
    let totalNumberDaysInMonth = moment().daysInMonth();
    let day = 1;
    let arrDays = [];
  
    while(day <= totalNumberDaysInMonth) {
      let current = moment().date(day);
      current.set({h: 0, m: 0, s: 0});
      arrDays.push(current.toDate());
      day++;
    }
  
    return arrDays;
  }
 
  getDaysOfTheWeek(start_date: moment.Moment):any[] {
    let totalNumberDaysInWeek = 7;
    let day = 1;
    let arrDays = [];
  
    if (start_date === undefined) {
      start_date = moment();
    } else {
      start_date = moment(start_date);
    }

    while(day <= totalNumberDaysInWeek) {
      let current = start_date.day(day);
      current.set({h: 0, m: 0, s: 0});
      arrDays.push(current.toDate());
      day++;
    }

    return arrDays;
  }

  getHoursOfTheDay(start_date: moment.Moment):any[] {
    let totalHoursInTheDay = 24;
    let hour = 1;
    let arrDays = [];
  
    if (start_date === undefined) {
      start_date = moment();
    } else {
      start_date = moment(start_date);
    }

    while(hour <= totalHoursInTheDay) {
      let current = start_date.hour(hour);
      current.set({m: 0, s: 0});
      arrDays.push(current.toDate());
      hour++;
    }

    return arrDays;
  }

  getMinutesOfTheHour(start_date: moment.Moment):any[] {
    let totalMinutesInTheHour = 60;
    let minute = 0;
    let arrDays = [];
  
    if (start_date === undefined) {
      start_date = moment();
    } else {
      start_date = moment(start_date);
    }

    while(minute <= totalMinutesInTheHour) {
      let current = start_date.minute(minute);
      current.set({s: 0});
      arrDays.push(current.toDate());
      minute = minute + 5;
    }

    return arrDays;
  }
}
