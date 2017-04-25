import * as fromQuestions from './questions';
import * as fromPages from './pages';
import * as fromUser from './user';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';

export interface State {
  questions: fromQuestions.State;
  pages: fromPages.State;
  user: fromUser.State;
}

const reducers = {
  questions: fromQuestions.reducer,
  pages: fromPages.reducer,
  user: fromUser.reducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getPagesState = (state: State) => state.pages;
export const getUserState = (state: State) => state.user;
export const getQuestionsState = (state: State) => state.questions;
