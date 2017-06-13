import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question } from './questions.model';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { calculateUserPoints } from './questionhelper';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as pages from '../actions/pages';
import * as user from '../actions/user';
import * as questions from '../actions/questions';
import { Observable } from 'rxjs/Observable';
import { QuestionComponent } from '../question/question.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'olx-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  questions: Observable<Question[]>;
  question: Observable<Question>;

  @ViewChild(QuestionComponent)
  private questionComponent: QuestionComponent;

  index;
  hasNextQuestion = false;
  hasPreviousQuestion = false;

  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.questions = store.select(fromRoot.getQuestionsState)
      .map(state => state.pickedQuestions);
  }

  ngOnInit() {
    this.question = this.route.params
      .switchMap((params: Params) => {
        const index = +params['question-number'] - 1;
        this.index = index;
        this.store.dispatch(new pages.ChangedPageAction({ pageNumber: index + 3 }));
        return this.questions
          .do(questions => {
            this.hasNextQuestion = this.index < questions.length - 1;
            this.hasPreviousQuestion = this.index > 0;
          })
          .map(questions => questions[this.index]);
      });

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  nextPage() {
    // FIXME do the calculation as part of questions.AnsweredAction
    this.subscription = this.question
      .map(question => calculateUserPoints(question, this.questionComponent.answers))
      .subscribe(userPoints => this.store.dispatch(new user.PointsAddedAction(userPoints)));

    this.store.dispatch(new questions.AnsweredAction(this.index, this.questionComponent.answers));

    if (this.hasNextQuestion) {
      this.router.navigate(['/quiz/kysymykset', this.index + 2]);
    } else {
      this.store.dispatch(new pages.ChangedPageAction({ pageNumber: this.index + 4 }));
      this.router.navigate(['/quiz/tulokset']);
    }
  }

}
