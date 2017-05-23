import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EtiService } from '../eti.service';
import { ComprobanteService } from '../comprobante.service';
import { AuthService } from '../auth.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-detalle-inscripto',
  templateUrl: './detalle-inscripto.component.html',
  styleUrls: ['./detalle-inscripto.component.css']
})
export class DetalleInscriptoComponent implements OnInit {
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  inscripto: any = null;
  eti: any;
  comprobantes = [];
  mensaje: any = false;
  comprobanteEncontrado: any;
  uploading: boolean = false;
  fileSelected: boolean = false;
  uploadUrl = `${environment.baseUrl}/api/upload`;
  baseUrl = environment.baseUrl;

  constructor(private _route: ActivatedRoute, private _router: Router,
    private _etiService: EtiService,
    private _comprobanteService: ComprobanteService,
    private auth: AuthService) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }


  ngOnInit() {
   this._route.params.subscribe((params: Params) => {
     this._etiService.getEti(params['etiId']).subscribe(
       (eti: {inscripciones, _id}) => {
         this.eti = eti;
         if(eti) {
           this.fileSelected = false;
           this.uploading = false
           this.inscripto =_.find(eti.inscripciones, { '_id': params['inscripcionId']});
           this._comprobanteService.getComprobantes(eti._id).subscribe(
             comprobantes => {
               this.comprobantes = comprobantes
             },
             error => console.log(error)
           );
         }
       }
     );

   });
 }

 guardar() {
   this._etiService.updateInscripto(this.inscripto)
   .subscribe(
     data => {
       this.mensaje = "Cambios Guardados";
       this._router.navigate(['/eti', this.eti._id]);
     },
     error => {
       console.log(error)
     }
   );
 }

 onUploadOutput(output: UploadOutput): void {
   console.log(output);
    if (output.type === 'allAddedToQueue') { // when all files added in queue
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
      this.fileSelected = true;
    } else if (output.type === 'uploading') {
      this.uploading = true;
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') { // drag over event
      this.dragOver = true;
    } else if (output.type === 'dragOut') { // drag out event
      this.dragOver = false;
    } else if (output.type === 'drop') { // on drop event
      this.dragOver = false;
    } else if (output.type === 'done') {
      this._etiService.getEti(this.eti._id, true);
    }
  }

  startUpload(): void {  // manually start uploading
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.uploadUrl + `/${this.eti._id}/${this.inscripto._id}`,
      method: 'POST',
      concurrency: 1 // set sequential uploading of files with concurrency 1
    }

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  buscarComprobante(referencia) {
    this.comprobanteEncontrado = _.find(this.comprobantes, {referencia});
  }

  asociarComprobante() {
    this.inscripto.referenciaComprobante = this.comprobanteEncontrado.referencia;
    this.guardar();
  }

}
