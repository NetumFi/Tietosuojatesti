import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Router } from '@angular/router';

@Component({
  selector: 'olx-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input()
  seconds;

  secondsLeft;
  subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.secondsLeft = this.seconds;
    this.subscription = Observable.timer(this.seconds, 1000)
      .subscribe(tick => this.timer());
  }

  timer() {
    this.secondsLeft--;
    if (this.secondsLeft === 0) {
      alert('Aika loppui');
      this.subscription.unsubscribe();
      this.toResultPage();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toResultPage() {
    this.router.navigate(['/tulokset']);
  }

}
