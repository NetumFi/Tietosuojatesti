import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Observable } from 'rxjs/Observable';
import { Question } from './questions/questions.model';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';

@Component({
  selector: 'olx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  pageNumber: Observable<number>;
  questions: Observable<Question[]>;
  amountOfPages: Observable<number>;

  constructor(
    private questionService: QuestionService,
    private store: Store<fromRoot.State>
  ) {
    this.pageNumber = store.select(fromRoot.getPagesState)
      .map(state => state.pageNumber);
  }

  ngOnInit() {
    this.questionService.initQuestions(10);
    this.questions = this.questionService.getQuestions();
    this.amountOfPages = this.questions.map(questions => questions.length + 3);
  }

}

