import { Component, OnInit } from '@angular/core';

import { EtiService } from '../eti.service';
@Component({
  selector: 'app-eti-list',
  templateUrl: './eti-list.component.html',
  styleUrls: ['./eti-list.component.css']
})
export class EtiListComponent implements OnInit {

  etis = [];
  constructor(private _etiService: EtiService) { }

  ngOnInit() {
    this._etiService.getEtis()
    .subscribe(etis => {
      this.etis = etis;
    })
  }

}
