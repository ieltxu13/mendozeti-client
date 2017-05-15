import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as _ from 'lodash';

import { EtiService } from '../eti.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-eti',
  templateUrl: './eti.component.html',
  styleUrls: ['./eti.component.css']
})
export class EtiComponent implements OnInit {
  @ViewChild('filtro')
  filtro: ElementRef;
  eti: any;
  inscriptos: number;
  preInscriptos: number;
  enEspera: number;
  toggleCondition: any = {
    estado: 'asc',
    nombre: 'asc'
  };
  constructor(private _route: ActivatedRoute, private _etiService: EtiService, private auth: AuthService) { }

  ngOnInit() {
   this._route.params.subscribe(params => {
      this._etiService.getEti(params['id'])
      .subscribe((eti: {inscripciones}) => {
        this.eti = eti;
        this.inscriptos  = _.filter(eti.inscripciones, {estado : 'Inscripto'}).length
        this.preInscriptos  = _.filter(eti.inscripciones, {estado : 'Pre inscripto'}).length
        this.enEspera = _.filter(eti.inscripciones, {estado : 'En lista de espera'}).length
      });
   });
   let eventObservable = Observable.fromEvent(this.filtro.nativeElement, 'keyup')
      eventObservable.subscribe();
 }
  public sortInscriptosBy(campo: string){
    this.toggleCondition[campo] = this.toggleCondition[campo] == 'asc' ? 'desc': 'asc';
    this.eti.inscripciones = _.orderBy(this.eti.inscripciones, campo, this.toggleCondition[campo]);
  }

  puedeEditar(inscripto) {
    return this.auth.authenticated() && this.auth.user.admin || inscripto._id == this.auth.user.inscripcionId;
  }

}
