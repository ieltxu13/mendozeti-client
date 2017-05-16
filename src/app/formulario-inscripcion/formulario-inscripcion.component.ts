import { Component, OnInit, OnDestroy } from '@angular/core';
import { EtiService } from '../eti.service';

@Component({
  selector: 'app-formulario-inscripcion',
  templateUrl: './formulario-inscripcion.component.html',
  styleUrls: ['./formulario-inscripcion.component.css']
})
export class FormularioInscripcionComponent implements OnInit, OnDestroy {

  inscripto: any = {};
  etiActivo = null;
  mensaje: string;
  formularioHabilitado = false;
  estado: string = "sin enviar";
  etisSub: any;
  constructor(private _etiService: EtiService) {

  }

  ngOnInit() {
    this.etisSub = this._etiService.getEtis().subscribe(etis => {
      this.etiActivo = this._etiService.getActiveEti();
      if(etis.length && (!this.etiActivo || !this.etiActivo.inscripcionesAbiertas)) {
        this.estado = "error";
        this.mensaje = "Las inscripciones no se encuentran habilitadas";
      } else {
        this.formularioHabilitado = true;
        this.mensaje = null;
        this.estado = "sin enviar";
      }
    },
    error => {
      this.mensaje = ""
    });
  }

  inscribir() {
    this._etiService.inscribir(this.inscripto)
    .subscribe(
    inscripto => {
      this.formularioHabilitado = false;
      this.mensaje = "Tu formulario se envió correctamente, revisa tu correo para continuar";
      this.estado = "enviado";
    },
    error => {
      this.mensaje = error._body;
      this.estado = "error";
    });
  }

  resetearFormulario() {
    this._etiService.getEtis(true); // force etis synchronization
    this.inscripto = {};
    this.formularioHabilitado = true;
  }

  ngOnDestroy() {
    this.etisSub.unsubscribe();
  }

}
