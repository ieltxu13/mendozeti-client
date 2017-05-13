import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import * as _ from "lodash";

@Injectable()
export class EtiService {

  private etiUrl = 'http://localhost:3000/api/eti';
  private currentEti;
  etis$ = new BehaviorSubject(null);
  eti$ = new BehaviorSubject(null);
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

  getEtis(noCache: Boolean = false) {
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

  getEti(_id) {
    if(this.etis.length) {
      let etiFound = _.find(this.etis, { _id });
      this.eti$.next(etiFound);
    } else {
      const url = `${this.etiUrl}/${_id}`;
      this._http.get(url).map(res => res.json())
      .subscribe(eti => {
        this.eti$.next(eti);
      });
    }
    return this.eti$;
  }

  getInscripto(_id) {
    return _.find(this.getActiveEti().inscripciones, { _id });
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
