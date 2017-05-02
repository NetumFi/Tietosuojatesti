import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import { Http } from '@angular/http';
import * as pages from './actions/pages';
import * as questions from './actions/questions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'olx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  progress: Observable<number>;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store<fromRoot.State>,
    private http: Http
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.http.get('assets/questions.json')
      .map(data => data.json())
      .subscribe(loadedQuestions => {
        this.store.dispatch(new questions.LoadedAction(loadedQuestions));
        this.store.dispatch(new questions.InitializedAction());
      }));
    this.subscriptions.push(this.store.select(fromRoot.getQuestionsState)
      .map(state => state.pickedQuestions.length)
      .subscribe(amount => this.store.dispatch(new pages.InitializedAmountOfPagesAction({ amountOfPages: amount + 3 }))));
    this.progress = this.store.select(fromRoot.getPagesState).map(state => state.progress);
  }

  ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe());
  }
}

