import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Question } from './questions/questions.model';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import { Http } from '@angular/http';
import * as questions from './actions/questions';

@Component({
  selector: 'olx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  pageNumber: Observable<number>;
  questions: Observable<Question[]>;
  amountOfPages: Observable<number>;

  subscription;

  constructor(
    private store: Store<fromRoot.State>,
    private http: Http
  ) {
    this.pageNumber = store.select(fromRoot.getPagesState)
      .map(state => state.pageNumber);
    this.questions = store.select(fromRoot.getQuestionsState)
      .map(state => state.pickedQuestions);
    this.amountOfPages = this.questions.map(questions => questions.length + 3);
  }

  ngOnInit() {
    this.subscription = this.http.get('assets/questions.json')
      .map(data => data.json())
      .subscribe(loadedQuestions => {
        this.store.dispatch(new questions.LoadedAction(loadedQuestions));
        this.store.dispatch(new questions.InitializedAction());
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

