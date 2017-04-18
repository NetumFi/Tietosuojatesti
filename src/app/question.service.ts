import { Injectable } from '@angular/core';
import { Question, Option, Answer, Points } from './questions/questions.model';
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

  private answers: Answer[] = [];

  private allPoints: Observable<Points[]>;

  private user: User = { name: '', title: '', organization: '' };

  private pageNumber: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor(public http: Http) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get('assets/questions.json')
      .map(response => response.json());
  }

  getPageNumber() {
    return this.pageNumber;
  }

  setPageNumber(pageNumber) {
    this.pageNumber.next(pageNumber);
  }


  getGivenAnswers(question: Question): Answer[] {
    const answers: Answer[] = [];
    question.choices.forEach((option: Option) => {
      this.answers.filter((answer: Answer) => {
        return option.id === answer.optionId;
      }).forEach((answer: Answer) => {
        answers.push(answer);
      });
    });
    if (answers.length === 0) {
      question.choices.forEach((option: Option) => {
        answers.push({'optionId': option.id, 'checked': false});
      });
    }
    return answers;
  }

  updateAnswer(answers: Answer[]) {
    answers.forEach(answer => {
      const matched: Answer[] = this.answers.filter(oldAnswer => {
        return answer.optionId === oldAnswer.optionId;
      });
      if (matched.length === 0) {
        this.answers.push(answer);
      } else {
        this.answers.forEach((oldAnswer, index) => {
          if (answer.optionId === oldAnswer.optionId) {
            this.answers[index] = answer;
          }
        });
      }
    });
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  calculatePoints(): Observable<number> {
    if (this.allPoints == null) {
      this.loadPoints();
    }
    return this.allPoints.map(allPoints => {
      let sum = 0;
      this.answers.forEach((answer: Answer) => {
        allPoints.filter((points: Points) => {
          return points.optionId === answer.optionId && answer.checked;
        }).forEach((points: Points) => {
          sum += points.pointsIfChecked;
        });
      });
      return sum;
    });
  }

  calculateMaxPoints(): Observable<number> {
    if (this.allPoints == null) {
      this.loadPoints();
    }
    const optionIds: string[] = [];
    this.getQuestions().subscribe(questions => {
      questions.forEach(question => {
        question.choices.forEach(option => optionIds.push(option.id));
      });
    });
    return this.allPoints.map(allPoints => {
      let sum = 0;
      allPoints.filter((points: Points) => {
        return optionIds.some(optionId => points.optionId === optionId && points.pointsIfChecked > 0);
      }).forEach((points: Points) => {
        sum += points.pointsIfChecked;
      });
      return sum;
    });
  }

  calculatePercentage(): Observable<number> {
    return Observable.forkJoin(this.calculatePoints(), this.calculateMaxPoints()).map(data => {
      let percentage = 0;
      if (data[1] > 0) {
        percentage = data[0] * 100 / data[1];
      }
      return percentage;
    });
  }

  private loadPoints() {
    this.allPoints = this.http.get('assets/points.json')
      .map(response => response.json());
  }
}
