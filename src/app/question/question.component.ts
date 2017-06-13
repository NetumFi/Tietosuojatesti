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
  language;

  answers: Answer[];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.language = this.languageService.getLanguage();
  }

  ngOnChanges() {
    this.answers = this.question.choices.map(option => { return { optionId: option.id, checked: false }; } );
  }

}
