import * as questions from '../actions/questions';

export interface State {
  ids: string[];
}

export const initialState: State = {
  ids: []
};

export function reducer(state = initialState, action: questions.Actions): State {
  return state;
}
