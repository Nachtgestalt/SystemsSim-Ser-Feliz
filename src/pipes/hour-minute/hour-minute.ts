import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";

/**
 * Generated class for the HourMinutePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'hourMinute',
})
export class HourMinutePipe implements PipeTransform {

  transform(value: number) {
    return moment.unix(value).format("hh:mm A");
  }
}
