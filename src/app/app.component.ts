import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Observable } from 'rxjs/Observable';
import { Question } from './questions/questions.model';

@Component({
  selector: 'olx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  pageNumber: Observable<number>;
  questions: Observable<Question[]>;
  amountOfPages: Observable<number>;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.pageNumber = this.questionService.getPageNumber();
    this.questionService.initQuestions(10);
    this.questions = this.questionService.getQuestions();
    this.amountOfPages = this.questions.map(questions => questions.length + 3);
  }

}

