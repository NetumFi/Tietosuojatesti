import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';

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
    private questionService: QuestionService) {}

  ngOnInit() {
    this.questionService.setPageNumber(13);
    this.user = this.questionService.getUser();
    this.userPoints = this.questionService.getUserPoints();
    this.maxPoints = this.questionService.getMaxPoints();
    this.percentage = this.maxPoints <= 0 ? 0 : this.userPoints * 100 / this.maxPoints;
  }

  backToBeginning() {
    this.router.navigate(['/']);
  }

}
