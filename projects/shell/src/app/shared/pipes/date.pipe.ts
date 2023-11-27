import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat',
})
export class DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value) {
      let date = null;
      try {
        date = formatDate(value, 'dd-MMM-yyyy', 'en-US');
      } catch (error) {
        date = 'Invalid date entered into pipe';
        console.error(error);
      }
      return date;
    }
  }
}
