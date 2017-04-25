import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as pages from '../actions/pages';
import * as user from '../actions/user';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'olx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  name;
  organization;
  title;

  subscription: Subscription;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private store: Store<fromRoot.State>
  ) {
    this.subscription = this.store.select(fromRoot.getUserState).map(state => state.user)
      .subscribe(user => {
        this.name = user.name;
        this.organization = user.organization;
        this.title = user.title;
      });
  }

  ngOnInit() {
    this.store.dispatch(new pages.ChangedPageAction({ pageNumber: 2 }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  nextPage() {
    this.save();
    this.router.navigate(['/kysymykset/', 1]);
  }

  save() {
    this.store.dispatch(new user.DetailsAddedAction({name: this.name, title: this.title, organization: this.organization}));
    this.store.dispatch(new user.PointsResetAction());
    this.questionService.resetMaxPoints();
  }

}
