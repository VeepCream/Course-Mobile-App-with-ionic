import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Date pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'datePipe'
})
@Injectable()
export class DatePipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    let month =['มค','กพ','มีค','เมย','พค','มิย','กค','สิง','กย','ตค','พย','ธค'];
    let date = value.split("-");
    return date[0]+" "+month[date[1]]+" "+date[2];
  }
}
