import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'timestampDate',
})
export class TimestampDatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number) {
    return moment.unix(value).format("DD-MM-YYYY");
  }
}
