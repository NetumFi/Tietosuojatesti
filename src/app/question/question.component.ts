import { Component, EventEmitter, Input, OnChanges } from '@angular/core';
import { Answer, Question } from '../questions/questions.model';

@Component({
  selector: 'olx-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnChanges {

  @Input()
  question: Question;

  answers: Answer[];

  constructor() {}

  ngOnChanges() {
    this.answers = this.question.choices.map(option => { return { optionId: option.id, checked: false, text: option.text }; } );
  }

}
