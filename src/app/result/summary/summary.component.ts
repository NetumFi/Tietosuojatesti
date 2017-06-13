import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'olx-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  failedQuestions: Observable<any[]>;

  constructor(
    private store: Store<fromRoot.State>,
    private languageService: LanguageService
  ) {
    this.failedQuestions = store.select(fromRoot.getQuestionsState)
      .map(questionState => {
        const failedQuestions = [];
        if (questionState.pickedQuestions) {
          questionState.pickedQuestions.forEach((question, i) => {
            if (!questionState.answers[i]) {
              failedQuestions.push({ index: i, question: question[languageService.getLanguage()] });
            }
          });
        }
        return failedQuestions;
      });
  }

  ngOnInit() {
  }

}
