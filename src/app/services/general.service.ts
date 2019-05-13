import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { 

  }

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
