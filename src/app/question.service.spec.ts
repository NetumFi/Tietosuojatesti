/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionService } from './question.service';
import { HttpModule, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { mockPointsJson, mockQuestionsJson } from './jsonresponse.mock';
import { Answer } from './questions/questions.model';

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

  it('should load questions and calculate user and max points', inject([QuestionService, XHRBackend], (questionService, mockBackend) => {
    pending(); // Should it do all that?
    /*
    const mockQuestionsResponse = () =>  mockQuestionsJson;
    const mockPointsResponse = () => mockPointsJson;
    const mockAnswer1 = [
      { 'optionId': '015', 'checked': true },
      { 'optionId': '012', 'checked': true },
      { 'optionId': '011', 'checked': true },
      { 'optionId': '014', 'checked': true },
      { 'optionId': '002', 'checked': true },
      { 'optionId': '013', 'checked': true },
      { 'optionId': '003', 'checked': true }
    ];
    const mockAnswer2 = [{ 'optionId': '011', 'checked': false }];

    mockBackend.connections.subscribe(c => {
      c.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(
          c.request.url.indexOf('q') >= 0 ? mockQuestionsResponse() : mockPointsResponse())
      })));
    });
    expect(questionService).toBeTruthy();

    questionService.getQuestion(1).subscribe(question => {
      expect(question).not.toBe(null);
      expect(questionService.hasMoreQuestions(0)).toBe(true);
      expect(questionService.hasPreviousQuestions(0)).toBe(false);
      expect(questionService.hasMoreQuestions(1)).toBe(false);
      expect(questionService.hasPreviousQuestions(1)).toBe(true);
      const answers: Answer[] = questionService.getGivenAnswers(question);
      expect(answers.length === 5);
      answers.forEach(answer => expect(['011', '012', '013', '014', '015']).toContain(answer.optionId));
      answers.forEach(answer => expect(answer.checked).toBe(false));
    });
    questionService.getQuestion(2).subscribe(question => {
      expect(question).toBe(null);
    });
    questionService.calculateMaxPoints().subscribe(maxPoints => {
      expect(maxPoints).toBe(7);
    });
    questionService.calculatePoints().subscribe(userPoints => {
      expect(userPoints).toBe(0);
    });
    questionService.updateAnswer(mockAnswer1);
    questionService.calculatePoints().subscribe(userPoints => {
      expect(userPoints).toBe(5);
    });
    questionService.calculatePercentage().subscribe(percentage => {
      expect(percentage).toBeLessThan(75);
    });
    questionService.updateAnswer(mockAnswer2);
    questionService.calculatePoints().subscribe(userPoints => {
      expect(userPoints).toBe(6);
    });
    questionService.calculatePercentage().subscribe(percentage => {
      expect(percentage).toBeGreaterThan(75);
    });
    questionService.getQuestion(1).subscribe(question => {
      const answers: Answer[] = questionService.getGivenAnswers(question);
      expect(answers.length === 5);
      answers.forEach(answer => expect(['011', '012', '013', '014', '015']).toContain(answer.optionId));
      expect(answers.filter(answer => answer.checked).length).toBe(4);
    });
*/
  }));
});
