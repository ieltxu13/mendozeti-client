import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { MdSnackBar } from '@angular/material';


import * as _ from 'lodash';

import { EtiService } from '../eti.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  eti: any;
  verSexo: false;
  cantidadInscriptos: number;
  preInscriptos: any;
  cantidadPreInscriptos: number;
  cantidadEnEspera: number;
  filterForm: FormGroup;
  etiSub: any;
  fechaHoy: Date = new Date();
  alojamientos: any= [];
  remeras: any= [];
  carnivoros: any= [];
  vegetarianos: any= [];
  celiacos: any= [];
  hombres: any= [];
  mujeres: any= [];
  remerasHombre: any= [];
  remerasMujer: any= [];
  hombreXS: any= [];
  hombreS: any= [];
  hombreL: any= [];
  hombreXL: any= [];
  hombreXXL: any= [];
  mujerXS: any= [];
  mujerS: any= [];
  mujerL: any= [];
  mujerXL: any= [];
  mujerXXL: any= [];
  seminarios: any= [];
  seminarioPrimero: any= [];
  seminarioSegundo: any= [];
  seminarioCualquiera: any= [];
  _ = _;
  provincias = [
    { pais: 1, id: 1, name: 'TODAS' },
    { pais: 1, id: 2, name: 'Buenos Aires' },
    { pais: 1, id: 3, name: 'CABA' },
    { pais: 1, id: 4, name: 'Catamarca' },
    { pais: 1, id: 5, name: 'Chaco' },
    { pais: 1, id: 6, name: 'Chubut' },
    { pais: 1, id: 7, name: 'Córdoba' },
    { pais: 1, id: 8, name: 'Corrientes' },
    { pais: 1, id: 9, name: 'Entre Ríos' },
    { pais: 1, id: 10, name: 'Formosa' },
    { pais: 1, id: 11, name: 'Jujuy' },
    { pais: 1, id: 12, name: 'La Pampa' },
    { pais: 1, id: 13, name: 'La Rioja' },
    { pais: 1, id: 14, name: 'Mendoza' },
    { pais: 1, id: 15, name: 'Misiones' },
    { pais: 1, id: 16, name: 'Neuquén' },
    { pais: 1, id: 17, name: 'Río Negro' },
    { pais: 1, id: 18, name: 'Salta' },
    { pais: 1, id: 19, name: 'San Juan' },
    { pais: 1, id: 20, name: 'San Luis' },
    { pais: 1, id: 21, name: 'Santa Cruz' },
    { pais: 1, id: 22, name: 'Santa Fe' },
    { pais: 1, id: 23, name: 'Santiago del Estero' },
    { pais: 1, id: 24, name: 'Tierra del Fuego' },
    { pais: 1, id: 25, name: 'Tucumán' },
    { pais: 2, id: 26, name: 'Otra' }
  ];
  inscripcionesFiltradas: any;
  constructor(private _route: ActivatedRoute,
    private _etiService: EtiService,
    public auth: AuthService,
    public formBuilder: FormBuilder,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.filterForm = this.formBuilder.group({
      datos: [''],
      estado: [''],
      provincia: ['TODAS'],
      limite: [10],
      observados: [true],
      remera: [''],
      alojamiento: [''],
      seminario: [''],
      tipoComida: [''],
      diaLLegada: [''],
    });

    this.etiSub = this._etiService.getEti(this._route.snapshot.params['id'], true)
      .subscribe((eti: { inscripciones: { fechaInscripcion, fechaInscripcionParsed, fechaVencimiento } }) => {
        this.eti = eti;
        if (eti) {
          this.filtrarInscriptos(this.filterForm.value);
        }
      });

    this.filterForm.valueChanges.subscribe(changes => {
      this.filtrarInscriptos(changes);
    });

  }

  filtrarInscriptos(filtros) {
    if (this.eti) {
      this.inscripcionesFiltradas = _(this.eti.inscripciones)
        .filter((inscripcion: any) => {
          return filtros.datos == '' ||
            inscripcion.nombre.toUpperCase().indexOf(filtros.datos.toUpperCase()) !== -1 ||
            inscripcion.apellido.toUpperCase().indexOf(filtros.datos.toUpperCase()) !== -1 ||
            !_.isUndefined(inscripcion.documento) && inscripcion.documento.toUpperCase().indexOf(filtros.datos.toUpperCase()) !== -1;
        })
        .filter((inscripcion: any) => {
          switch (filtros.estado.toUpperCase()) {
            case 'TODOS':
              return true;
            case '':
              return true;
            case 'NO VENCIDOS':
              return inscripcion.estado.toUpperCase() != 'VENCIDO';
            case 'POR APROBAR':
              return inscripcion.estado.toUpperCase() == 'PRE INSCRIPTO' && inscripcion.comprobante;
            case 'PRE INSCRIPTO / SC':
              return inscripcion.estado.toUpperCase() == 'PRE INSCRIPTO' && inscripcion.comprobante == undefined;
            case 'OBSERVADOS':
              return inscripcion.observado;
            default:
              return inscripcion.estado.toUpperCase() == filtros.estado.toUpperCase();
          }
        })
        .filter((inscripcion: any) => {
          switch (filtros.provincia.toUpperCase()) {
            case 'TODAS':
              return true;
            default:
              return inscripcion.provincia && inscripcion.provincia.toUpperCase() == filtros.provincia.toUpperCase();
          }
        })
        .filter((inscripcion: any) => {
          switch (filtros.remera.toUpperCase()) {
            case 'SI':
              return inscripcion.remera;
            case 'NO':
              return !inscripcion.remera;
            default:
              return true;
          }
        })
        .filter((inscripcion: any) => {
          switch (filtros.alojamiento.toUpperCase()) {
            case 'SI':
              return inscripcion.alojamiento;
            case 'NO':
              return !inscripcion.alojamiento;
            default:
              return true;
          }
        })
        .filter((inscripcion: any) => {
          switch (filtros.seminario.toUpperCase()) {
            case 'SI':
              return inscripcion.seminario;
            case 'NO':
              return !inscripcion.seminario;
            case 'SOLO MAÑANA':
              return inscripcion.seminario && inscripcion.turnoSeminario == 'primero';
            case 'SOLO TARDE':
              return inscripcion.seminario && inscripcion.turnoSeminario == 'segundo';
            default:
              return true;
          }
        })
        .filter((inscripcion: any) => {
          switch (filtros.seminario.toUpperCase()) {
            case 'SI':
              return inscripcion.seminario;
            case 'NO':
              return !inscripcion.seminario;
            case 'SOLO MAÑANA':
              return inscripcion.seminario && inscripcion.turnoSeminario == 'primero';
            case 'SOLO TARDE':
              return inscripcion.seminario && inscripcion.turnoSeminario == 'segundo';
            default:
              return true;
          }
        })
        .filter((inscripcion: any) => {
          switch (filtros.tipoComida.toUpperCase()) {
            case 'CARNIVORO':
              return inscripcion.tipoComida == 'Carne';
            case 'CELIACO':
              return inscripcion.tipoComida == 'Celiaco';
            case 'VEGETARIANO':
              return inscripcion.tipoComida  == 'Vegetariano';
            default:
              return true;
          }
        })
        .filter((inscripcion: any) => {
          switch (filtros.diaLLegada.toUpperCase()) {
            case 'ANTES DEL VIERNES':
              return inscripcion.diaLLegada == 'Antes del viernes';
            case 'VIERNES':
              return inscripcion.diaLLegada == 'Viernes';
            case 'SABADO':
              return inscripcion.diaLLegada  == 'Sabado';
            case 'NO SABE':
              return inscripcion.diaLLegada  == 'No sabe';
            default:
              return true;
          }
        })
        .filter((inscripcion: any) => {
          if (filtros.observados) {
            return true;
          } else {
            return !inscripcion.observado;
          }
        })
        .take(filtros.limite)
        .value();

        this.alojamientos = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.alojamiento })
        this.remeras = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.remera })
        this.carnivoros = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.tipoComida == 'Carne' })
        this.vegetarianos = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.tipoComida == 'Vegetariano' })
        this.celiacos = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.tipoComida == 'Celiaco' })
        this.hombres = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Masculino' })
        this.mujeres = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Femenino' })
        this.hombres = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Masculino' })
        this.remerasHombre = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.remera && i.sexo == 'Masculino' })
        this.remerasMujer = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.remera && i.sexo == 'Femenino' })
        this.hombreXS = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Masculino' && i.remera && i.talleRemera == 'XS'})
        this.hombreS = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Masculino' && i.remera && i.talleRemera == 'S'})
        this.hombreL = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Masculino' && i.remera && i.talleRemera == 'L'})
        this.hombreXL = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Masculino' && i.remera && i.talleRemera == 'XL'})
        this.hombreXXL = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Masculino' && i.remera && i.talleRemera == 'XXL'})
        this.mujerXS = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Femenino' && i.remera && i.talleRemera == 'XS'})
        this.mujerS = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Femenino' && i.remera && i.talleRemera == 'S'})
        this.mujerL = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Femenino' && i.remera && i.talleRemera == 'L'})
        this.mujerXL = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Femenino' && i.remera && i.talleRemera == 'XL'})
        this.mujerXXL = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.sexo == 'Femenino' && i.remera && i.talleRemera == 'XXL'})
        this.seminarios = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.seminario })
        this.seminarioPrimero = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.seminario && i.turnoSeminario == 'primero' })
        this.seminarioSegundo = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.seminario && i.turnoSeminario == 'segundo' })
        this.seminarioCualquiera = _.filter(this.inscripcionesFiltradas, function(i: any){ return i.seminario && i.turnoSeminario == 'cualquiera' })
    }
  }

  parsearFecha(fecha) {
    return fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear() +
      '  ' + fecha.getHours() + ':' + fecha.getMinutes();
  }

  contarDiasHabiles(fecha, dias) {
    let diasDeLaSemana = [1, 2, 3, 4, 5];

    let msPorDia = 1000 * 60 * 60 * 24;
    let msFecha = fecha.getTime();
    let diasHabilesPasados = 1;
    let fechaPasadosLosDias;
    while (diasHabilesPasados <= dias) {
      msFecha = msFecha + msPorDia;
      let mañanaDate = new Date(msFecha);
      if (_.includes(diasDeLaSemana, mañanaDate.getDay())) {
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
