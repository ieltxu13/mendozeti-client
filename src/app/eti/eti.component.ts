import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { EtiService } from '../eti.service';
@Component({
  selector: 'app-eti',
  templateUrl: './eti.component.html',
  styleUrls: ['./eti.component.css']
})
export class EtiComponent implements OnInit {

  eti: any;
  inscriptos: number;
  preInscriptos: number;
  enEspera: number;
  constructor(private _route: ActivatedRoute, private _etiService: EtiService) { }

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
 }

}
