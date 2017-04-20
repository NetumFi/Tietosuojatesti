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
import { UserService } from '../user.service';
import { userServiceStub } from '../userservice.mock';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule ],
      declarations: [ QuestionsComponent, TimerComponent, TimePipe, QuestionComponent ],
      providers: [
        { provide: QuestionService, useValue: questionServiceStub },
        { provide: UserService, useValue: userServiceStub },
        { provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'question-number': 1 }]) } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
