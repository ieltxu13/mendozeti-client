import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    FormGroup,
    FormBuilder
  } from '@angular/forms';
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
  filterForm: FormGroup;
  etiSub: any;
  fechaHoy: Date = new Date();
  provincias = [
    {pais: 1, id: 1, name: 'TODAS'},
    {pais: 1, id: 2, name: 'Buenos Aires'},
    {pais: 1, id: 3, name: 'CABA'},
    {pais: 1, id: 4, name: 'Catamarca'},
    {pais: 1, id: 5, name: 'Chaco'},
    {pais: 1, id: 6, name: 'Chubut'},
    {pais: 1, id: 7, name: 'Córdoba'},
    {pais: 1, id: 8, name: 'Corrientes'},
    {pais: 1, id: 9, name: 'Entre Ríos'},
    {pais: 1, id: 10, name: 'Formosa'},
    {pais: 1, id: 11, name: 'Jujuy'},
    {pais: 1, id: 12, name: 'La Pampa'},
    {pais: 1, id: 13, name: 'La Rioja'},
    {pais: 1, id: 14, name: 'Mendoza'},
    {pais: 1, id: 15, name: 'Misiones'},
    {pais: 1, id: 16, name: 'Neuquén'},
    {pais: 1, id: 17, name: 'Río Negro'},
    {pais: 1, id: 18, name: 'Salta'},
    {pais: 1, id: 19, name: 'San Juan'},
    {pais: 1, id: 20, name: 'San Luis'},
    {pais: 1, id: 21, name: 'Santa Cruz'},
    {pais: 1, id: 22, name: 'Santa Fe'},
    {pais: 1, id: 23, name: 'Santiago del Estero'},
    {pais: 1, id: 24, name: 'Tierra del Fuego'},
    {pais: 1, id: 25, name: 'Tucumán'},
    {pais: 2, id: 26, name: 'Otra'}
  ];
  inscripcionesFiltradas: any;
  constructor(private _route: ActivatedRoute,
    private _etiService: EtiService,
    public auth: AuthService,
    public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      datos: [''],
      estado: [''],
      provincia: ['TODAS'],
      limite: [ 10 ],
      observados: [ true ]
    });

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
        this.filtrarInscriptos(this.filterForm.value);
      }
    });

    this.filterForm.valueChanges.subscribe(changes => {
      this.filtrarInscriptos(changes);
    });

 }

  filtrarInscriptos(filtros) {
    if(this.eti) {
      this.inscripcionesFiltradas = _(this.eti.inscripciones)
      .filter((inscripcion:any) => {
        return filtros.datos == '' ||
        inscripcion.nombre.toUpperCase().indexOf(filtros.datos.toUpperCase()) !== -1 ||
        inscripcion.apellido.toUpperCase().indexOf(filtros.datos.toUpperCase()) !== -1 ||
        !_.isUndefined(inscripcion.documento) && inscripcion.documento.toUpperCase().indexOf(filtros.datos.toUpperCase()) !== -1;
      })
      .filter((inscripcion:any) => {
        switch(filtros.estado.toUpperCase()) {
          case 'TODOS':
            return true;
          case '':
            return true;
          case 'POR APROBAR':
            return inscripcion.estado.toUpperCase() == 'PRE INSCRIPTO' && inscripcion.comprobante;
          default:
            return inscripcion.estado.toUpperCase() == filtros.estado.toUpperCase();
        }
      })
      .filter((inscripcion: any) => {
        switch(filtros.provincia.toUpperCase()) {
          case 'TODAS':
            return true;
          default:
            return inscripcion.provincia && inscripcion.provincia.toUpperCase() == filtros.provincia.toUpperCase();
        }
      })
      .filter((inscripcion: any) => {
        if(filtros.observados) {
          return true;
        } else {
          return !inscripcion.observado;
        }
      })
      .take(filtros.limite)
      .value();
    }
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

  vencido(fecha: Date) {
    return fecha && (fecha.getTime() < this.fechaHoy.getTime());
  }
}
