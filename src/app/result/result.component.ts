import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { UserService } from '../user.service';

@Component({
  selector: 'olx-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  user;
  maxPoints;
  userPoints;
  percentage;

  constructor(
    private router: Router,
    private userService: UserService,
    private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.setPageNumberOfResultsPage();
    this.user = this.userService.getUser();
    this.userPoints = this.userService.getPoints();
    this.maxPoints = this.questionService.getMaxPoints();
    this.percentage = this.maxPoints <= 0 ? 0 : this.userPoints * 100 / this.maxPoints;
  }

  backToBeginning() {
    this.questionService.initQuestions(10);
    this.router.navigate(['/']);
  }

}
