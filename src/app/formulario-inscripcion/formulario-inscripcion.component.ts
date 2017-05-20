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
  paises = [{
    id: 1,
    name: 'Argentina',
  },{
    id: 2,
    name: 'Otro'
  }];
  provincias = [
    {pais: 1, id: 1, name: 'Buenos Aires'},
    {pais: 1, id: 2, name: 'Catamarca'},
    {pais: 1, id: 3, name: 'Chaco'},
    {pais: 1, id: 4, name: 'Chubut'},
    {pais: 1, id: 5, name: 'Córdoba'},
    {pais: 1, id: 6, name: 'Corrientes'},
    {pais: 1, id: 7, name: 'Entre Ríos'},
    {pais: 1, id: 8, name: 'Formosa'},
    {pais: 1, id: 9, name: 'Jujuy'},
    {pais: 1, id: 10, name: 'La Pampa'},
    {pais: 1, id: 11, name: 'La Rioja'},
    {pais: 1, id: 12, name: 'Mendoza'},
    {pais: 1, id: 13, name: 'Misiones'},
    {pais: 1, id: 14, name: 'Neuquén'},
    {pais: 1, id: 15, name: 'Río Negro'},
    {pais: 1, id: 16, name: 'Salta'},
    {pais: 1, id: 17, name: 'San Juan'},
    {pais: 1, id: 18, name: 'San Luis'},
    {pais: 1, id: 19, name: 'Santa Cruz'},
    {pais: 1, id: 20, name: 'Santa Fe'},
    {pais: 1, id: 21, name: 'Santiago del Estero'},
    {pais: 1, id: 22, name: 'Tierra del Fuego'},
    {pais: 1, id: 23, name: 'Tucumán'},
    {pais: 2, id: 25, name: 'Otra'}
  ];
  comidas = [
    {value: 'Carne'},
    {value: 'Vegetariano'},
    {value: 'Celiaco'}
  ];
  diasLlegada = [
    {value:'Antes del viernes'},
    {value:'Viernes'},
    {value:'Sabado'},
    {value:'No sabe'}
  ];
  diasSalida = [
    {value:'Domingo'},
    {value:'Lunes'},
    {value:'No sabe'}
  ];
  isPaisInputHidden: boolean = true;
  constructor(private _etiService: EtiService) {

  }

  paisSelectChange(value){
    if(value.id == 1) {
      this.isPaisInputHidden = true;
      this.inscripto.pais = value.name;
    } else {
      this.isPaisInputHidden = false;
      this.inscripto.pais = '';
    }
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
