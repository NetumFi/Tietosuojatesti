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
    this.questionService.calculatePoints().subscribe(userPoints => this.userPoints = userPoints);
    this.questionService.calculateMaxPoints().subscribe(maxPoints => this.maxPoints = maxPoints);
    this.questionService.calculatePercentage().subscribe(percentage => this.percentage = percentage);
  }

  backToBeginning() {
    this.router.navigate(['/']);
  }

}
