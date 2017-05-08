import * as fromPages from './pages';
import { ChangedPageAction, InitializedAmountOfPagesAction } from '../actions/pages';

describe('reducer: pagesReducer', () => {
  it('should set the amount of of pages', () => {
    const originalState: fromPages.State = { pageNumber: 5, amountOfPages: 5, progress: 100 };
    const payload = { amountOfPages: 20 };
    const newState = fromPages.reducer(originalState, new InitializedAmountOfPagesAction(payload));
    expect(newState.amountOfPages).toEqual(20);
    expect(newState.pageNumber).toEqual(5);
    expect(newState.progress).toEqual(25);
  });
  it('should change the page number', () => {
    const originalState: fromPages.State = { pageNumber: 5, amountOfPages: 20, progress: 25 };
    const payload = { pageNumber: 15 };
    const newState = fromPages.reducer(originalState, new ChangedPageAction(payload));
    expect(newState.pageNumber).toEqual(15);
    expect(newState.amountOfPages).toEqual(20);
    expect(newState.progress).toEqual(75);
  });
});
