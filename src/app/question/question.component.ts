import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Answer, Question } from '../questions/questions.model';
import { LanguageService } from '../language.service';

@Component({
  selector: 'olx-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnChanges {

  @Input()
  question: Question;

  @Input()
  answers: Answer[];

  language;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.language = this.languageService.getLanguage();
  }

  ngOnChanges() {
    if (this.answers.length === 0) {
      this.answers = this.question.choices.map(option => {
        return {optionId: option.id, checked: false};
      });
    }
  }

}
