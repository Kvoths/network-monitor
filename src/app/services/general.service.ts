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
 
  getDaysOfTheWeek():any[] {
    let totalNumberDaysInWeek = 7;
    let day = 1;
    let arrDays = [];
  
    while(day <= totalNumberDaysInWeek) {
      let current = moment().day(day);
      current.set({h: 0, m: 0, s: 0});
      arrDays.push(current.toDate());
      day++;
    }

    return arrDays;
  }
}
