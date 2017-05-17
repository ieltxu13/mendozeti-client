import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class EtiComponent implements OnInit, OnDestroy {
  eti: any;
  inscriptos: number;
  preInscriptos: number;
  enEspera: number;
  filtroEstado: string = '';
  etiSub: any;

  constructor(private _route: ActivatedRoute, private _etiService: EtiService, private auth: AuthService) { }

  ngOnInit() {
    this.etiSub = this._etiService.getEti(this._route.snapshot.params['id'])
    .subscribe((eti: {inscripciones: { fechaInscripcion, fechaInscripcionParsed, fechaVencimiento }}) => {
      this.eti = eti;
      if(eti) {
        this.inscriptos  = _.filter(eti.inscripciones, {estado : 'Inscripto'}).length;
        this.preInscriptos  = _.filter(eti.inscripciones, {estado : 'Pre inscripto'}).length;
        this.enEspera = _.filter(eti.inscripciones, {estado : 'En lista de espera'}).length;
        _.map(eti.inscripciones, (inscripto) => {
          let fecha = new Date(inscripto.fechaInscripcion)
          if(!inscripto.fechaInscripcionParsed) {
            inscripto.fechaInscripcionParsed = this.parsearFecha(fecha);
          }
          if(!inscripto.fechaVencimiento) {
            let fechaVencimiento = this.contarDiasHabiles(fecha, 7);
            inscripto.fechaVencimiento = this.parsearFecha(fecha);
          }
        });
      }
    });
 }

  puedeEditar(inscripto) {
    return this.auth.authenticated() && (this.auth.user.admin || inscripto._id == this.auth.user.inscripcionId);
  }

  parsearFecha(fecha) {
    return fecha.getDate() + '/' + (fecha.getMonth() + 1) +  '/' + fecha.getFullYear() +
    '  ' + fecha.getHours() + ':' + fecha.getMinutes();
  }

  contarDiasHabiles(fecha, dias) {
    let diasDeLaSemana = [1, 2, 3, 4, 5];

    let msPorDia = 1000*60*60*24;
    let msFecha = fecha.getTime();
    let diasHabilesPasados = 1;
    let fechaPasadosLosDias;
    while(diasHabilesPasados <= dias) {
      msFecha = msFecha + msPorDia;
      let mañanaDate = new Date(msFecha);
      if(_.includes(diasDeLaSemana, mañanaDate.getDay())) {
        diasHabilesPasados++;
        fechaPasadosLosDias = mañanaDate;
      }
    }
    return fechaPasadosLosDias;
  }

  ngOnDestroy() {
    this.etiSub.unsubscribe();
  }
}
