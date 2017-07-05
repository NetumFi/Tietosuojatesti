import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Answer, Question } from './questions.model';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as pages from '../actions/pages';
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

  answersOfSelectedQuestion: Observable<Answer[]>;

  subscription: Subscription;

  @ViewChild(QuestionComponent)
  private questionComponent: QuestionComponent;

  index;
  hasNextQuestion = false;
  hasPreviousQuestion = false;

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
        this.index = +params['question-number'] - 1;
        return this.questions
          .do(questions => {
            this.hasNextQuestion = this.index < questions.length - 1;
            this.hasPreviousQuestion = this.index > 0;
          })
          .map(questions => questions[this.index]);
      });

    this.subscription = this.store.select(fromRoot.getQuestionsState).map(state => state.allAnswers).subscribe(allAnswers => {
      this.answersOfSelectedQuestion = this.question
        .map(q => allAnswers.filter(answer => q.choices.some(option => answer.optionId === option.id)));
    });

  }

  nextPage() {
    this.store.dispatch(new questions.AnsweredAction(this.index, this.questionComponent.answers));

    if (this.hasNextQuestion) {
      this.store.dispatch(new pages.ChangedPageAction({ pageNumber: this.index + 3 }));
      this.router.navigate(['/quiz/kysymykset', this.index + 2]);
    } else {
      this.store.dispatch(new pages.ChangedPageAction({ pageNumber: this.index + 4 }));
      this.router.navigate(['/quiz/tulokset']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
