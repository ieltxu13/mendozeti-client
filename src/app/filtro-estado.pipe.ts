import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEstado'
})
export class FiltroEstadoPipe implements PipeTransform {

  transform(data: any, searchTerm: string): any {
    searchTerm = searchTerm.toUpperCase();
      if(!data) return [];
      return data.filter(item => {
        return item.estado.toUpperCase() === searchTerm || searchTerm == 'TODOS' || searchTerm == '';
      });
  }

}
