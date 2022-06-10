import { Pipe, PipeTransform } from '@angular/core';
import { Area } from '../../interfaces/areas';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(areas: Area[]): Area[] {
    return areas.sort((a1, a2) => a1.name.localeCompare(a2.name));
  }

}
