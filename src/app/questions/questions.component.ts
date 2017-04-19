import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Answer, Option, Question } from './questions.model';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { QuestionHelper } from './questionhelper';


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
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params
      .switchMap((params: Params) => {
        this.index = +params['question-number'] - 1;
        this.questionService.setPageNumber(this.index + 3);
        return this.questionService.getQuestions()
          .do(questions => {
            this.hasNextQuestion = this.index < questions.length - 1;
            this.hasPreviousQuestion = this.index > 0;
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
    this.questionService.setMaxPoints(
      this.questionService.getMaxPoints() + QuestionHelper.calculateMaxPoints(this.question));
    this.questionService.setUserPoints(
      this.questionService.getUserPoints() + QuestionHelper.calculateUserPoints(this.question, this.answers));
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

}
