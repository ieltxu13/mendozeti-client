import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from "lodash";

@Injectable()
export class ComprobanteService {

  private comprobanteUrl = 'http://inscripcioneseti.com/api/comprobantes';
  //private comprobanteUrl = 'http://localhost:3000/api/comprobantes';
  comprobantes$ = new BehaviorSubject([]);


  constructor(private _http: Http) { }

  guardarComprobante(comprobante) {
    const url = `${this.comprobanteUrl}/${comprobante.eti}`;
    return this._http.post(url, comprobante);
  }

  handleError(error) {
    console.log(error)
  }

  getComprobantes(etiId): Observable<any> {
    const url = `${this.comprobanteUrl}/${etiId}`;
    return this._http.get(url).map(res => res.json());
  }

}
