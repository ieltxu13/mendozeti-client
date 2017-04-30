import { Component, OnInit } from '@angular/core';
import { EtiService } from '../eti.service';

@Component({
  selector: 'app-formulario-inscripcion',
  templateUrl: './formulario-inscripcion.component.html',
  styleUrls: ['./formulario-inscripcion.component.css']
})
export class FormularioInscripcionComponent implements OnInit {

  inscripto: any = {};
  constructor(private _etiService: EtiService) {

  }

  ngOnInit() {

  }

  inscribir() {
    this._etiService.inscribir(this.inscripto)
    .subscribe(inscripto => {
      this._etiService.getEtis(true); // force etis synchronization
    });
  }

}
