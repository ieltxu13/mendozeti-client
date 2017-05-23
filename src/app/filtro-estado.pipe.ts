import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEstado'
})
export class FiltroEstadoPipe implements PipeTransform {

  transform(data: any, searchTerm: string): any {
    searchTerm = searchTerm.toUpperCase();
      if(!data) return [];
      return data.filter(item => {
        switch(searchTerm) {
          case 'TODOS':
            return true;
          case '':
            return true;
          case 'POR APROBAR':
            return item.estado.toUpperCase() == 'PRE INSCRIPTO' && item.comprobante;
          default:
            return item.estado.toUpperCase() == searchTerm;
        }
      });
  }

}
