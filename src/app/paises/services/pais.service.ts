import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.eu/rest/v2';

  get httpParams() {
    return new HttpParams().set('fields', 'name;capital;alpha2Code;flag;population');
  }

  constructor( private http: HttpClient ) { }

  buscarPais(value: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${value}`;
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  buscarPaisPorCodigo(value: string): Observable<Country> {
    const url = `${ this.apiUrl }/alpha/${value}`;
    return this.http.get<Country>(url);
  }

  buscarCapital(value: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${value}`;
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  buscarPaisesPorRegion(value: string): Observable<Country[]> {
    const url = `${ this.apiUrl }/region/${value}`;
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

}
