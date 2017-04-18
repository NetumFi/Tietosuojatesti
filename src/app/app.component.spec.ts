/* tslint:disable:no-unused-variable */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { QuestionsComponent } from './questions/questions.component';
import { UserComponent } from './user/user.component';
import { ResultComponent } from './result/result.component';
import { QuestionService } from './question.service';
import { questionServiceStub } from './question.service.mock';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [
        AppComponent,
        IntroComponent,
        UserComponent,
        QuestionsComponent,
        ResultComponent
      ],
      providers: [ { provide: QuestionService, useValue: questionServiceStub } ]
    });
    TestBed.compileComponents();
    questionServiceStub.questions = Observable.of([{}, {}]);
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should show the total amount of pages', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(' 1/4');
  }));
});
