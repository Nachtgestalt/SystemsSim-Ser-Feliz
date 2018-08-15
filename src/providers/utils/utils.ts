import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class UtilsProvider {

  constructor() {
    console.log('Hello UtilsProvider Provider');
  }

  getAgeOnlyYear(dateString) {
    const now = new Date();
    let a = moment(now, 'YYYY[-]MM[-]DD');
    let b = moment(dateString, 'YYYY[-]MM[-]DD');

    const years = a.diff(b, 'year');
    b.add(years, 'years');

    const months = a.diff(b, 'months');
    b.add(months, 'months');

    const days = a.diff(b, 'days');

    const age = {
      years: years,
      months: months,
      days: days
    };

    return age.years;
  }

}
