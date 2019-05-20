import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandStringPipe } from './command-string.pipe';
import { CronStringPipe } from './cron-string.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ 
    CommandStringPipe,
    CronStringPipe
  ],
  exports: [
    CommandStringPipe,
    CronStringPipe
  ]
})
export class PipesModule { }
