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
    const maxPoints = calculateMaxPoints(this.question);
    const userPoints = calculateUserPoints(this.question, this.answers);

    this.questionService.addMaxPoints(maxPoints);
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

}
