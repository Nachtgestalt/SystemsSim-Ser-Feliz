import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'hourMinute',
})
export class HourMinutePipe implements PipeTransform {

  transform(value: number) {
    return moment.unix(value).format("hh:mm A");
  }
}
