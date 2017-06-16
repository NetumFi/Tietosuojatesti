import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as pages from '../actions/pages';
import { LanguageService } from '../language.service';

@Component({
  selector: 'olx-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input()
  seconds;

  selectedLanguage = 'sv';

  secondsLeft;
  subscription;

  resultsPageNumber;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.secondsLeft = this.seconds;
    this.subscription = Observable.timer(this.seconds, 1000)
      .subscribe(tick => this.timer());
    this.store.select(fromRoot.getQuestionsState)
      .map(state => state.pickedQuestions.length)
      .subscribe(amount => this.resultsPageNumber = amount + 3);
    this.selectedLanguage = document.location.pathname.split('/')[1];
  }

  timer() {
    this.secondsLeft--;
    if (this.secondsLeft === 0) {
      const timeHasRunOutText = this.languageService.getLanguage() === 'sv' ? 'Tiden tog slut' : 'Aika loppui';
      alert(timeHasRunOutText);
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
