import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { User } from './user.model';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as pages from '../actions/pages';

@Component({
  selector: 'olx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private questionService: QuestionService,
    private store: Store<fromRoot.State>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new pages.ChangedPageAction({ pageNumber: 2 }));
    this.user = this.userService.getUser();
  }

  nextPage() {
    this.save();
    this.router.navigate(['/kysymykset/', 1]);
  }

  save() {
    this.userService.setUser(this.user);
    this.questionService.resetMaxPoints();
    this.userService.resetPoints();
  }

}
