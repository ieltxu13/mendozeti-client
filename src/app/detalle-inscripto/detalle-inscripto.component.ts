import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtiService } from '../eti.service';

@Component({
  selector: 'app-detalle-inscripto',
  templateUrl: './detalle-inscripto.component.html',
  styleUrls: ['./detalle-inscripto.component.css']
})
export class DetalleInscriptoComponent implements OnInit {

  inscripto: any;
  constructor(private _route: ActivatedRoute, private _etiService: EtiService) { }

  ngOnInit() {
   this._route.params.subscribe(params => {

      this.inscripto = this._etiService.getInscripto(params['id'])
   });
 }

}
