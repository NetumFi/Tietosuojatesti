import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Answer, Option, Question } from './questions.model';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { calculateMaxPoints, calculateUserPoints } from './questionhelper';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as pages from '../actions/pages';

@Component({
  selector: 'olx-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  question: Question;
  answers: Answer[];
  index;
  hasNextQuestion = false;
  hasPreviousQuestion = false;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private questionService: QuestionService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.subscription = this.route.params
      .switchMap((params: Params) => {
        const index = +params['question-number'] - 1;
        this.index = index;
        this.store.dispatch(new pages.ChangedPageAction({ pageNumber: index + 3 }));
        return this.questionService.getQuestions()
          .do(questions => {
            this.hasNextQuestion = this.index < questions.length - 1;
            this.hasPreviousQuestion = this.index > 0;
            if (this.questionService.getMaxPoints() === 0) {
              this.initMaxPoints(questions);
            }
          })
          .map(questions => questions[this.index]);
      }).subscribe(question => {
        this.question = question;
        this.initAnswers();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  nextPage() {
    const userPoints = calculateUserPoints(this.question, this.answers);

    this.userService.addPoints(userPoints);

    if (this.hasNextQuestion) {
      this.router.navigate(['/kysymykset', this.index + 2]);
    } else {
      this.router.navigate(['/tulokset']);
    }
  }

  save(answers: Answer[]) {
    this.answers = answers;
  }

  initAnswers() {
    this.answers = this.question.choices.map((option: Option) => { return { 'optionId': option.id, 'checked': false}; });
  }

  initMaxPoints(questions: Question[]) {
    questions.forEach(question => {
      const maxPoints = calculateMaxPoints(question);
      this.questionService.addMaxPoints(maxPoints);
    });
  }

}
