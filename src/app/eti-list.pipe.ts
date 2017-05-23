import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etiList',
  pure: false
})
export class EtiListPipe implements PipeTransform {

  transform(data: any, searchTerm: string): any {
    searchTerm = searchTerm.toUpperCase();
      if(!data) return [];
      return data.filter(item => {
        return item.nombre.toUpperCase().indexOf(searchTerm) !== -1 ||
        item.apellido.toUpperCase().indexOf(searchTerm) !== -1 ||
        item.documento.toUpperCase().indexOf(searchTerm) !== -1;
      });
  }

}
