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
  cantidadInscriptos: number;
  preInscriptos: any;
  cantidadPreInscriptos: number;
  cantidadEnEspera: number;
  filtroEstado: string = '';
  etiSub: any;
  fechaHoy: Date = new Date();
  constructor(private _route: ActivatedRoute, private _etiService: EtiService, public auth: AuthService) { }

  ngOnInit() {
    this.etiSub = this._etiService.getEti(this._route.snapshot.params['id'], true)
    .subscribe((eti: {inscripciones: { fechaInscripcion, fechaInscripcionParsed, fechaVencimiento }}) => {
      this.eti = eti;
      if(eti) {
        this.cantidadInscriptos  = _.filter(eti.inscripciones, {estado : 'Inscripto'}).length;
        this.preInscriptos = _.filter(eti.inscripciones, {estado : 'Pre inscripto'});
        this.cantidadPreInscriptos  = this.preInscriptos.length;
        this.cantidadEnEspera = _.filter(eti.inscripciones, {estado : 'En lista de espera'}).length;
        _.map(this.preInscriptos, (inscripto: any) => {
          let fecha = new Date(inscripto.fechaPreInscripcion)
          if(!inscripto.fechaPreInscripcionParsed) {
            inscripto.fechaPreInscripcionParsed = this.parsearFecha(fecha);
          }
          if(!inscripto.fechaVencimiento) {
            let fechaVencimiento = this.contarDiasHabiles(fecha, 7);
            inscripto.vencido = this.vencido(fechaVencimiento);
            inscripto.fechaVencimientoParsed = this.parsearFecha(fechaVencimiento);
          }
        });
      }
    });
 }

  puedeEditar(inscripto) {
    console.log(inscripto);
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

  vencido(fecha: Date) {
    return fecha && (fecha.getTime() < this.fechaHoy.getTime());
  }
}
