import { Component, OnInit, Directive, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Command, CommandService } from '../../services/command.service';
import { ResultChartDirective } from './result-chart.directive';
import { ResultsChartComponent } from '../results-chart/results-chart.component';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
  providers: [CommandService]
})
export class ResultsListComponent implements OnInit {
  public commands: Command[];
  public chartsRef: ResultsChartComponent[];
  public resultsChartClass: any;
  @ViewChild(ResultChartDirective) resultChartHost: ResultChartDirective;
  
  constructor(
    private _commandService: CommandService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { 
    this.resultsChartClass = ResultsChartComponent;
  }

  ngOnInit() {
    this._commandService.getAllCommands().subscribe(
      commands => {
        this.commands = commands;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    console.log(this.resultChartHost);
    //chart-selector-5cc96b4c0cf84e40c48e813b

    /*let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ResultsChartComponent);
    let viewContainerRef = this.resultChartHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);*/
  }

  loadComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ResultsChartComponent);
    let viewContainerRef = this.resultChartHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.instance.command = this.commands[0];
  }
}
