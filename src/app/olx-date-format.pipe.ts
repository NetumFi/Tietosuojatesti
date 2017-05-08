import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'olxDateFormat'
})
export class OlxDateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'string') {
      return new DatePipe('fi').transform(value, 'd.M.yyyy');
    }
    return '';
  }

}
