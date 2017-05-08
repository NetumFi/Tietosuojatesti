import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as pages from '../actions/pages';

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

  resultsPageNumber;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.secondsLeft = this.seconds;
    this.subscription = Observable.timer(this.seconds, 1000)
      .subscribe(tick => this.timer());
    this.store.select(fromRoot.getQuestionsState)
      .map(state => state.pickedQuestions.length)
      .subscribe(amount => this.resultsPageNumber = amount + 3);
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
    this.store.dispatch(new pages.ChangedPageAction({ pageNumber: this.resultsPageNumber }));
    this.router.navigate(['/tulokset']);
  }

}
