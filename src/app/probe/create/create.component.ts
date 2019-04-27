import { Component, OnInit } from '@angular/core';
import { PeticionesService } from '../../services/peticiones.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [PeticionesService]
})
export class CreateComponent implements OnInit {
  public probes;

  constructor(
    private _peticionesService: PeticionesService
  ) { }

  ngOnInit() {
    this._peticionesService.getProbes().subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

}
