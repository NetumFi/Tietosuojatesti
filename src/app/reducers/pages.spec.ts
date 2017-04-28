import * as fromPages from './pages';

import { ChangedPageAction } from '../actions/pages';

describe("reducer: pagesReducer", () => {
  it("should change the page number", () => {
    const originalState: fromPages.State = { pageNumber: 5 }
    const payload = { pageNumber: 999 };
    expect(fromPages.reducer(originalState, new ChangedPageAction(payload)).pageNumber).toBe(999);
  });
});
