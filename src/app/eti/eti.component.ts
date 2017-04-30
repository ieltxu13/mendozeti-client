import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EtiService } from '../eti.service';
@Component({
  selector: 'app-eti',
  templateUrl: './eti.component.html',
  styleUrls: ['./eti.component.css']
})
export class EtiComponent implements OnInit {

  eti: any;
  constructor(private _route: ActivatedRoute, private _etiService: EtiService) { }

  ngOnInit() {
   this.eti = this._route.params.subscribe(params => {

      this._etiService.getEti(params['id'])
      .subscribe(eti => {
        this.eti = eti;
      });
   });
 }

}
