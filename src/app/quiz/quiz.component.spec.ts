/* tslint:disable:no-unused-variable */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { IntroComponent } from '../intro/intro.component';
import { QuestionsComponent } from '../questions/questions.component';
import { UserComponent } from '../user/user.component';
import { ResultComponent } from '../result/result.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { getMockedQuestions } from '../testhelper';
import { LanguageService } from '../language.service';
import { QuizComponent } from './quiz.component';

describe('QuizComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        QuizComponent,
        IntroComponent,
        UserComponent,
        QuestionsComponent,
        ResultComponent
      ],
      providers: [
        LanguageService,
        { provide: XHRBackend, useClass: MockBackend },
        {
          provide: Store,
          useClass: class {
            dispatch = jasmine.createSpy('dispatch');
            select = jasmine.createSpy('select')
              .and.callFake(() => Observable.of({ pageNumber: 1, pickedQuestions: getMockedQuestions(1) }));
          }
        }
      ]
    });
    TestBed.compileComponents();
  }));

  it('should create the quiz', async(() => {
    const fixture = TestBed.createComponent(QuizComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
