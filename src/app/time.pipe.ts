
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  selectedLanguage = 'sv';

  times = {
    minuutti: 60,
    sekunti: 1
  };

  times_sv = {
    minut: 60,
    sekund: 1
  };

  constructor() {
    this.selectedLanguage = document.location.pathname.split('/')[1];
  }

  transform(seconds) {
    let time = '';
    for (const key in this.getTimes()) {
      if (Math.floor(seconds / this.getTimes()[key]) > 0 ) {
        let plural = '';
        if (Math.floor(seconds / this.getTimes()[key]) > 1 ) {
          plural = this.getPlural();
        }

        time += Math.floor(seconds / this.getTimes()[key]).toString() + ' ' + key.toString() + plural + ' ';
        seconds = seconds - this.getTimes()[key] * Math.floor(seconds / this.getTimes()[key]);

      }
    }
    return time;
  }

  getTimes() {
    return this.selectedLanguage === 'sv' ? this.times_sv : this.times;
  }

  getPlural() {
    return this.selectedLanguage === 'sv' ? 'er' : 'a';
  }
}
