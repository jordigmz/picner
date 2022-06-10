import { Pipe, PipeTransform } from '@angular/core';
import { Area } from '../../interfaces/areas';

@Pipe({
  name: 'areasFilter'
})
export class AreasFilterPipe implements PipeTransform {

  transform(areas: Area[], filterBy: string): Area[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    return filter
      ? areas.filter(
        (area) =>
          area.name.toLocaleLowerCase().includes(filter) ||
          area.description.toLocaleLowerCase().includes(filter)
      )
      : areas;
  }

}
