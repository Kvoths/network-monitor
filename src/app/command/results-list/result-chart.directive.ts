import { Input, Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[chart-selector]',
})
export class ResultChartDirective {
  @Input() id : string;
  constructor(public viewContainerRef: ViewContainerRef) { }
}