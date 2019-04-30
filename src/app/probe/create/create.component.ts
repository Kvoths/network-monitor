import { Component, OnInit } from '@angular/core';
import { ProbesService } from '../../services/probes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [ProbesService]
})

export class CreateComponent implements OnInit {

  constructor(
    private _probesService: ProbesService
  ) { }

  ngOnInit() {

  }

}
