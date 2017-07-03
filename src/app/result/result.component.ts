import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as pages from '../actions/pages';
import * as questions from '../actions/questions';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user.model';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

@Component({
  selector: 'olx-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {

  user: Observable<User>;
  userPoints: Observable<number>;

  maxPoints: Observable<number>;

  passed: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>
  ) {
    this.user = store.select(fromRoot.getUserState).map(state => state.user);
    this.maxPoints = store.select(fromRoot.getQuestionsState).map(state => state.maxPoints);

    this.userPoints = store.select(fromRoot.getQuestionsState)
      .map(state => state.questionPoints.reduce((a, b) => a + b, 0));

    this.passed = this.userPoints
      .switchMap(userPoints => this.maxPoints.map(maxPoints => this.getPercentage(maxPoints, userPoints)))
      .map(percentage => this.hasPassed(percentage));
  }

  hasPassed(percentage) {
    return percentage >= 75;
  }

  getPercentage(maxPoints, userPoints) {
    return userPoints * 100 / maxPoints;
  }

  backToBeginning() {
    this.store.dispatch(new pages.ChangedPageAction({ pageNumber: 1 }));
    this.router.navigate(['/quiz']);
  }

}
