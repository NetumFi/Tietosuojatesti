/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { QuestionsComponent } from './questions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { TimerComponent } from '../timer/timer.component';
import { TimePipe } from '../time.pipe';
import { QuestionComponent } from '../question/question.component';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Store } from '@ngrx/store';
import 'rxjs/add/observable/of';
import { getMockedQuestions } from '../testhelper';
import { By } from '@angular/platform-browser';

describe('QuestionsComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule ],
      declarations: [ QuestionsComponent, TimerComponent, TimePipe, QuestionComponent ],
      providers: [
        {
          provide: ActivatedRoute, useValue: { 'params': Observable.from([{ 'question-number': 1 }]) }
        },
        {
          provide: Store, useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = jasmine.createSpy('select').and.callFake(() => Observable.of( { pickedQuestions: getMockedQuestions(1) } ));
          }
        }

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

  it('should click Next page button', fakeAsync(() => {
    spyOn(component, 'nextPage');

    let button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.nextPage).toHaveBeenCalled();
  }));

});
