
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  times = {
    tunti: 3600,
    minuutti: 60,
    sekunti: 1
  };

  transform(seconds) {
    let time = '';
    for (const key in this.times) {
      if (Math.floor(seconds / this.times[key]) > 0 ) {
        let plural = '';
        if (Math.floor(seconds / this.times[key]) > 1 ) {
          plural = 'a';
        }

        time += Math.floor(seconds / this.times[key]).toString() + ' ' + key.toString() + plural + ' ';
        seconds = seconds - this.times[key] * Math.floor(seconds / this.times[key]);

      }
    }
    return time;
  }
}
