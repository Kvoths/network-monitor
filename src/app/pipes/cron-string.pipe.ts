import { Pipe, PipeTransform } from '@angular/core';
import { CronTime } from 'app/services/command.service';

@Pipe({
  name: 'cronString'
})
export class CronStringPipe implements PipeTransform {

  transform(time: CronTime, args?: any): any {
    let final_time = '';

    if (time.minute != '*') {
      final_time = `Cada ${time.minute.split('/')[1]} minuto/s`;
    } else if (time.hour != '*') {
      final_time = `Cada ${time.hour.split('/')[1]} hora/s`;
    } else if (time.dayMonth != '*') {
      final_time = 'Programación inválida';
    } else if (time.month != '*') {
      final_time = 'Programación inválida';
    } else if (time.dayWeek != '*') {
      final_time = 'Programación inválida';
    }

    return final_time;
  }

}
