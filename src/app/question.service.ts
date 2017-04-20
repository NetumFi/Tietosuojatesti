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


@Injectable()
export class QuestionService {

  private maxPoints = 0;

  private pageNumber: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor(public http: Http) { }

  addMaxPoints(maxPoints) {
    this.maxPoints += maxPoints;
  }

  resetMaxPoints() {
    this.maxPoints = 0;
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get('assets/questions.json')
      .map(response => response.json());
  }

  getPageNumber() {
    return this.pageNumber;
  }

  setPageNumber(pageNumber: number) {
    this.pageNumber.next(pageNumber);
  }

  getMaxPoints() {
    return this.maxPoints;
  }

}
