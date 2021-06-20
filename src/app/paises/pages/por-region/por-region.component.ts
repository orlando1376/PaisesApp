import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];
  error: boolean = false;
  mostrarEspere: boolean = false;

  constructor( private paisService: PaisService ) { }

  ngOnInit(): void {
  }

  getClassCSS(region: string): string {
    return (region === this.regionActiva) ? 'btn btn-primary': 'btn btn-outline-primary';
  }

  activarRegion(region: string) {
    if (region !== this.regionActiva) {
      this.regionActiva = region;
      this.buscar(region);
    }
  }

  buscar(value: string) {
    this.mostrarEspere = true;
    this.error = false;
    this.paises = [];

    this.paisService.buscarPaisesPorRegion(value)
      .subscribe( paises => {        
        this.paises = paises;
        this.mostrarEspere = false;
      }, error => {
        this.mostrarEspere = false;
        this.error = true;
        this.paises = [];
      })
  }

}
