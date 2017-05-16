import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { EtiService } from '../eti.service';
import { AuthService } from '../auth.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import * as _ from 'lodash';

//const URL = 'http://localhost:3000/api/upload';
const URL = 'http://inscripcioneseti.com/api/upload';

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
  mensaje: any = false;
  constructor(private _route: ActivatedRoute, private _router: Router, private _etiService: EtiService, private auth: AuthService) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }


  ngOnInit() {
   this._route.params.subscribe((params: Params) => {
     this._etiService.getEti(params['etiId']).subscribe(
       (eti: {inscripciones}) => {
         this.eti = eti;
         if(eti)
          this.inscripto =_.find(eti.inscripciones, { '_id': params['inscripcionId']});
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
    console.log(output); // lets output to see what's going on in the console

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' },
      //   concurrency: 0
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
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
    }
  }

  startUpload(): void {  // manually start uploading
    const event: UploadInput = {
      type: 'uploadAll',
      url: URL + `/${this.eti._id}/${this.inscripto._id}`,
      method: 'POST',
      concurrency: 1 // set sequential uploading of files with concurrency 1
    }

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

}
