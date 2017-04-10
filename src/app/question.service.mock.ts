import { Observable } from 'rxjs/Observable';

export const questionServiceStub = {
  getQuestion: any => Observable.of({ id: 'q', text: 'first question', choices: [{ id: 'o', text: 'only option'}] }),
  getGivenAnswers: any => [],
  hasMoreQuestions: any => false,
  hasPreviousQuestions: any => false,
  getUser: () => [{ name: '', title: '', organization: ''}],
  calculatePoints: any => Observable.of(0),
  calculateMaxPoints: any => Observable.of(0),
  calculatePercentage: any => Observable.of(0),
  setPageNumber: any => {},
  getPageNumber: any => Observable.of(1)
};

