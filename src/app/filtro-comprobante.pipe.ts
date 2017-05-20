import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroComprobante'
})
export class FiltroComprobantePipe implements PipeTransform {

  transform(data: any, searchTerm?: any): any {
    searchTerm = searchTerm.toUpperCase();
      if(!data) return [];
      return data.filter(item => {
        return item.referencia.toUpperCase().indexOf(searchTerm) !== -1
      });
  }

}
