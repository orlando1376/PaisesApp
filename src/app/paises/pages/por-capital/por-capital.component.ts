import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent implements OnInit {

  txtBuscar: string = '';
  error: boolean = false;
  mostrarEspere: boolean = false;
  paises: Country[] = [];

  constructor( private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(value: string) {
    this.mostrarEspere = true;
    this.paises = [];
    this.error = false;
    this.txtBuscar = value;

    this.paisService.buscarCapital(value)
      .subscribe( paises => {        
        this.paises = paises;
        this.mostrarEspere = false;
      }, error => {
        this.error = true;
        this.mostrarEspere = false;
        this.paises = [];
      });

  }

}
