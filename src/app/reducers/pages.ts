import * as user from '../actions/pages';

export interface State {
  ids: string[];
}

export const initialState: State = {
  ids: []
};

export function reducer(state = initialState, action: user.Actions): State {
  return initialState;
}
