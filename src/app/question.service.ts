import { Injectable } from '@angular/core';
import { Question, Option, Answer } from './questions/questions.model';
import { User } from './user/user.model';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { pickQuestions } from './questions/questionhelper';


@Injectable()
export class QuestionService {

  private maxPoints = 0;

  private pageNumber: BehaviorSubject<number> = new BehaviorSubject(1);

  private questions: BehaviorSubject<Question[]>;

  private amountOfPages;

  constructor(public http: Http) {
    this.questions = new BehaviorSubject([]);
  }

  addMaxPoints(maxPoints) {
    this.maxPoints += maxPoints;
  }

  resetMaxPoints() {
    this.maxPoints = 0;
  }

  getQuestions() {
    return this.questions;
  }

  initQuestions(amount) {
    this.http.get('assets/questions.json')
      .subscribe(response => {
        const allQuestions: Question[] = response.json();
        this.questions.next(pickQuestions(allQuestions, amount));
      });
  }

  getPageNumber() {
    return this.pageNumber;
  }

  setPageNumber(pageNumber: number) {
    this.pageNumber.next(pageNumber);
  }

  setPageNumberOfResultsPage() {
    this.pageNumber.next(this.amountOfPages);
  }

  setAmountOfPages(amount) {
    this.amountOfPages = amount;
  }

  getMaxPoints() {
    return this.maxPoints;
  }

}
