import { Pipe, PipeTransform } from '@angular/core';
import { Command } from 'app/services/command.service';

@Pipe({
  name: 'commandString'
})
export class CommandStringPipe implements PipeTransform {

  transform(command: Command, args?: any): any {
    let commandString = command.name;

    for (let i = 0; i < command.parameters.length; i++)
    {
        let parameter = command.parameters[i];
        commandString += ` ${parameter['name']}`;

        if (parameter['value'] !== undefined && parameter['value'] !== null && parameter['value'] !== "") {
            commandString += ` ${parameter['value']}`;
        }
    }

    return commandString;
  }

}
