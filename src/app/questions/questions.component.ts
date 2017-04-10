import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { Answer, Question } from './questions.model';

@Component({
  selector: 'olx-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  question: Question = null;
  answers: Answer[] = [];
  index = null;
  hasNextQuestion = false;
  hasPreviousQuestion = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public questionService: QuestionService
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        let index = params['index'];
        if (index == null || index === undefined) {
          index = '0';
        }
        this.index = Number.parseInt(index);
        this.questionService.setPageNumber(this.index + 3);
        this.questionService.getQuestion(this.index).subscribe(q => {
          this.answers = this.questionService.getGivenAnswers(q);
          this.hasNextQuestion = this.questionService.hasMoreQuestions(this.index);
          this.hasPreviousQuestion = this.questionService.hasPreviousQuestions(this.index);
          this.question = q;
        });
      });
  }

  nextPage() {
    if (this.hasNextQuestion) {
      this.router.navigate(['/kysymykset', this.index + 1]);
    } else {
      this.router.navigate(['/tulokset']);
    }
  }

  previousPage() {
    if (this.hasPreviousQuestion) {
      this.router.navigate(['/kysymykset', this.index - 1]);
    } else {
      this.router.navigate(['/tiedot']);
    }
  }

  save() {
    this.questionService.updateAnswer(this.answers);
  }

  getOptionText(optionId) {
    return this.question.choices.filter(option => optionId === option.id)[0].text;
  }

}
