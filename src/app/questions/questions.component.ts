import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Answer, Option, Question } from './questions.model';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


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
  userPoints = 0;
  maxPoints = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.subscription = this.route.params
      .switchMap((params: Params) => {
        this.index = +params['index'];
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
    this.questionService.setMaxPoints(this.questionService.getMaxPoints() + this.calculateMaxPoints());
    this.questionService.setUserPoints(this.questionService.getUserPoints() + this.calculateUserPoints());
    if (this.hasNextQuestion) {
      this.router.navigate(['/kysymykset', this.index + 1]);
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

  calculateMaxPoints() {
    return this.question.choices.map((option: Option) => option.pointsIfChecked < 0 ? 0
      : option.pointsIfChecked).reduce((sum, current) => sum + current, 0);
  }

  calculateUserPoints() {
    return this.question.choices
      .filter((option: Option) => this.answers.some((answer: Answer) => answer.optionId === option.id && answer.checked))
      .map((option: Option) => option.pointsIfChecked).reduce((sum, current) => sum + current, 0);
  }}
