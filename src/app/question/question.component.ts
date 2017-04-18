import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer, Question } from '../questions/questions.model';

@Component({
  selector: 'olx-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  @Input()
  question: Question;

  @Input()
  answers: Answer[];

  @Output()
  onSave: EventEmitter<Answer[]> = new EventEmitter();

  constructor() {}

  getOptionText(id) {
    return this.question.choices.filter(option => id === option.id)[0].text;
  }

  save() {
    this.onSave.emit(this.answers);
  }

}
