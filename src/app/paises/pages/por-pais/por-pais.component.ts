import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent implements OnInit {

  txtBuscar: string = '';
  error: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;
  mostrarEspere: boolean = false;

  constructor( private paisService: PaisService) { }

  ngOnInit(): void {
  }

  buscar(value: string) {
    this.mostrarEspere = true;
    this.mostrarSugerencias = false;
    this.error = false;
    this.txtBuscar = value;

    this.paisService.buscarPais(value)
      .subscribe( paises => {   
        this.mostrarEspere = false;     
        this.paises = paises;
      }, error => {
        this.mostrarEspere = false;
        this.error = true;
        this.paises = [];
      })
  }

  sugerencias(value: string) {
    this.mostrarEspere = true;
    this.error = false;
    this.txtBuscar = value;
    this.mostrarSugerencias = true;

    this.paisService.buscarPais(value)
      .subscribe(
        paises => {
          this.mostrarEspere = false;
          this.paisesSugeridos = paises.splice(0, 5)
        },
        err => {
          this.mostrarEspere = false;
          this.paisesSugeridos = []
        }
      );
  }

  buscarSugerido(value: string) {
    this.buscar(value);
  }
}
