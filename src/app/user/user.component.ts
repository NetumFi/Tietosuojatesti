import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { User } from './user.model';

@Component({
  selector: 'olx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {
  }

  ngOnInit() {
    this.questionService.setPageNumber(2);
    this.user = this.questionService.getUser();
  }

  nextPage() {
    this.save();
    this.router.navigate(['/kysymykset/', 0]);
  }

  previousPage() {
    this.save();
    this.router.navigate(['/']);
  }

  save() {
    this.questionService.setUser(this.user);
  }

}
