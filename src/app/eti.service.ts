import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from "lodash";

@Injectable()
export class EtiService {

  private etiUrl = 'http://inscripcioneseti.com/api/eti';
  //private etiUrl = 'http://localhost:3000/api/eti';
  private currentEti;
  etis$ = new BehaviorSubject([]);
  eti$ = new BehaviorSubject({});
  etis = [];

  constructor(private _http: Http) { }

  inscribir(inscripto) {
    let etiActivo = _.find(this.etis, {'estado': 'activo'});
    const url = `${this.etiUrl}/${etiActivo._id}/inscripcion`;
    return this._http.post(url, inscripto);
  }

  handleError(error) {
    console.log(error)
  }

  getEtis(noCache: Boolean = false): Observable<any> {
    if(this.etis.length && !noCache) {
      this.etis$.next(this.etis);
    } else {
      const url = `${this.etiUrl}`;
      this._http.get(url).map(res => res.json())
      .subscribe(etis => {
        this.etis = etis;
        this.etis$.next(etis);
      });
    }
    return this.etis$;
  }

  getEti(_id, noCache?) {
    if(this.etis.length && !noCache) {
      let etiFound = _.find(this.etis, { _id });
      this.eti$.next(etiFound);
    } else {
      this.getEtis(noCache)
      .subscribe((etis: {inscripciones}) => {
        let eti = _.find(etis, {_id})
        this.eti$.next(eti);
      });
    }
    return this.eti$;
  }

  getActiveEti() {
    if(this.etis.length) {
      return _.find(this.etis, { 'estado': 'activo' });
    }
  }

  updateInscripto(inscripto) {
    let etiActivo = _.find(this.etis, {'estado': 'activo'});
    const url = `${this.etiUrl}/${etiActivo._id}/inscripcion/${inscripto._id}`;
    return this._http.put(url, inscripto);
  }
}
