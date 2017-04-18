import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Answer, Question } from './questions.model';
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
        this.answers = this.questionService.getGivenAnswers(this.question);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  nextPage() {
    if (this.hasNextQuestion) {
      this.router.navigate(['/kysymykset', this.index + 1]);
    } else {
      this.router.navigate(['/tulokset']);
    }
  }

  previousPage() {
    if (this.hasPreviousQuestion) {
      this.router.navigate(['/kysymykset', this.index - 1]);
    } else {
      this.router.navigate(['/tiedot']);
    }
  }

  save(answers: Answer[]) {
    this.questionService.updateAnswer(answers);
  }

}
