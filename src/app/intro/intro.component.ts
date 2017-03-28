import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent implements OnInit {

  constructor(
    private router: Router,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.questionService.setPageNumber(1);
  }

  nextPage() {
    this.router.navigate(['/tiedot']);
  }

}
