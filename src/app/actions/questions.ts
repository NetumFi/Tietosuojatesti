import { Action } from '@ngrx/store';
import { Answer, Question } from '../questions/questions.model';

export const LOADED = '[Questions] Loaded Questions';
export const INITIALIZED = '[Questions] Initialized random questions';
export const ANSWERED = '[Questions] Answered a question';

export class LoadedAction implements Action {
  readonly type = LOADED;

  constructor(public payload: Question[]) {}
}

export class InitializedAction implements Action {
  readonly type = INITIALIZED;

  constructor() {}
}

export class AnsweredAction implements Action {
  readonly type = ANSWERED;

  constructor(public questionIndex: number,
              public answers: Answer[]) {
  }
}

export type Actions
  = LoadedAction
  | InitializedAction
  | AnsweredAction;
