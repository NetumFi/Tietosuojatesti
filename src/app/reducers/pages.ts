import * as pages from '../actions/pages';

export interface State {
  pageNumber: number;
}

export const initialState: State = {
  pageNumber: 1
};

export function reducer(state = initialState, action: pages.Actions): State {
  switch (action.type) {
    case pages.CHANGED_PAGE: {
      const payload = action.payload;
      return { pageNumber: payload.pageNumber };
    }
  }
  return state;
}
