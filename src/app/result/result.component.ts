import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as pages from '../actions/pages';
import * as user from '../actions/user';
import { Observable } from 'rxjs/Observable';
import { User } from '../user/user.model';

@Component({
  selector: 'olx-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  user: Observable<User>;
  userPoints: Observable<number>;

  maxPoints;
  percentage: Observable<number>;

  passed: Observable<boolean>;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private store: Store<fromRoot.State>
  ) {
    this.user = store.select(fromRoot.getUserState).map(state => state.user);
    this.userPoints = store.select(fromRoot.getUserState).map(state => state.points);
  }

  ngOnInit() {
    this.store.dispatch(new pages.ChangedPageAction({ pageNumber: 13 }));
    this.maxPoints = this.questionService.getMaxPoints();
    this.percentage = this.userPoints.map(userPoints => this.maxPoints <= 0 ? 0 : userPoints * 100 / this.maxPoints);
    this.passed = this.percentage.map(percentage => percentage >= 75);
  }

  backToBeginning() {
    this.store.dispatch(new pages.ChangedPageAction({ pageNumber: 1 }));
    this.store.dispatch(new user.PointsResetAction());
    this.questionService.initQuestions(10);
    this.router.navigate(['/']);
  }

}
