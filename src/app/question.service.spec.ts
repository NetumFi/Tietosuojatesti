/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionService } from './question.service';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('QuestionService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        QuestionService,
        { provide: XHRBackend, useClass: MockBackend }
        ]
    });
  }));

  it('should ...', inject([QuestionService, XHRBackend], (service, mockBackend) => {
    expect(service).toBeTruthy();
  }));
});
