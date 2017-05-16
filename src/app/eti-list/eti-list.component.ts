import { Component, OnInit, OnDestroy } from '@angular/core';

import { EtiService } from '../eti.service';
@Component({
  selector: 'app-eti-list',
  templateUrl: './eti-list.component.html',
  styleUrls: ['./eti-list.component.css']
})
export class EtiListComponent implements OnInit, OnDestroy {

  etis = [];
  etisSub: any;
  constructor(private _etiService: EtiService) { }

  ngOnInit() {
    this.etisSub = this._etiService.getEtis()
    .subscribe(etis => {
      this.etis = etis;
    })
  }

  ngOnDestroy() {
    this.etisSub.unsubscribe();
  }

}
