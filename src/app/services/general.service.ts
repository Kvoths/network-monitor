import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { 

  }

  getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];

    while (date.getMonth() === month) {
       days.push(new Date(date));
       date.setDate(date.getDate() + 1);
    }

    return days;
  }
}
