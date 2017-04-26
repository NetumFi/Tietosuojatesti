import * as pages from '../actions/pages';

export interface State {
  pageNumber: number;
  amountOfPages: number;
  progress: number;
}

export const initialState: State = {
  pageNumber: 1,
  amountOfPages: 3,
  progress: 100 / 3
};

export function reducer(state = initialState, action: pages.Actions): State {
  switch (action.type) {
    case pages.CHANGED_PAGE: {
      const payload = action.payload;
      return {
        pageNumber: payload.pageNumber,
        amountOfPages: state.amountOfPages,
        progress: payload.pageNumber * 100 / state.amountOfPages
      };
    }
    case pages.INITIALIZED_AMOUNT_OF_PAGES: {
      const payload = action.payload;
      return {
        pageNumber: state.pageNumber,
        amountOfPages: payload.amountOfPages,
        progress: state.pageNumber * 100 / payload.amountOfPages
      };
    }
  }
  return state;
}
