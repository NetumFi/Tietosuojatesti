import { Observable } from 'rxjs/Observable';

export const questionServiceStub = {
  getQuestions: any => Observable.of([{ id: 'q', text: 'first question', choices: [{ id: 'o', text: 'only option', correct: true }]}]),
  getMaxPoints: () => Observable.of(0),
  addMaxPoints: any => {},
  resetMaxPoints: () => {},
  setPageNumber: any => {},
  getPageNumber: () => Observable.of(1)
};

