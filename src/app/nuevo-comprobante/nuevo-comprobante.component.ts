import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtiService } from '../eti.service';
import { ComprobanteService } from '../comprobante.service';
@Component({
  selector: 'app-nuevo-comprobante',
  templateUrl: './nuevo-comprobante.component.html',
  styleUrls: ['./nuevo-comprobante.component.css']
})
export class NuevoComprobanteComponent implements OnInit {

  etiSub;
  eti;
  comprobante: any = {
    combos: 0,
    alojamientos: 0,
    seminarios: 0,
    total: 0,
    eti: ""
  };
  constructor(private _etiService: EtiService, private _comprobanteService: ComprobanteService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.etiSub = this._etiService.getEti(this._route.snapshot.params['etiId'])
    .subscribe((eti: {_id}) => {
      if(eti) {
        this.eti = eti;
        this.comprobante.eti = eti._id;
      }
    });
  }

  guardarComprobante() {
    this._comprobanteService.guardarComprobante(this.comprobante)
    .subscribe(
      comprobante => {
        this._router.navigate(['/comprobantes', this.eti._id]);
      },
      error => console.log(error));
  }

}
