import {Component, OnInit} from '@angular/core';
import { QuestionService } from './question.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  pageNumber: Observable<number>;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.pageNumber = this.questionService.getPageNumber();

  }

}

