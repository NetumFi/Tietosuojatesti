/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionsComponent } from './questions.component';
import { questionServiceStub } from '../question.service.mock';
import { QuestionService } from '../question.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { TimerComponent } from '../timer/timer.component';
import { TimePipe } from '../time.pipe';
import { QuestionComponent } from '../question/question.component';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule ],
      declarations: [ QuestionsComponent, TimerComponent, TimePipe, QuestionComponent ],
      providers: [ { provide: QuestionService, useValue: questionServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    component.question = { id: 'q', text: 'first question', choices: [{ id: 'o', text: 'only option'}] };
    component.answers = [{ optionId: 'o', checked: false}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
