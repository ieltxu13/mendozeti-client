import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComprobanteService } from '../comprobante.service';
import { EtiService } from '../eti.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-comprobantes',
  templateUrl: './comprobantes.component.html',
  styleUrls: ['./comprobantes.component.css']
})
export class ComprobantesComponent implements OnInit, OnDestroy {
  etiSub;
  comprobantesSub;
  comprobantes: any;
  eti: any;

  constructor(private _etiService: EtiService, private _comprobanteService: ComprobanteService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.etiSub = this._etiService.getEti(this._route.snapshot.params['etiId'])
    .subscribe((eti: {_id, inscripciones}) => {
      if(eti) {
        this.eti = eti;
        this.comprobantesSub = this._comprobanteService.getComprobantes(this._route.snapshot.params['etiId'])
        .map((comprobantes) => {
          return _.map(comprobantes, (comprobante: {referencia}) => {
            return Object.assign({}, comprobante, {
              asignaciones: _.filter(eti.inscripciones, { referenciaComprobante: comprobante.referencia }).length
            });
          });
        })
        .subscribe((comprobantes) => {
          this.comprobantes = comprobantes;
        });
      }
    });
  }

  ngOnDestroy() {
    this.etiSub.unsubscribe();
    this.comprobantesSub.unsubscribe();
  }

}
