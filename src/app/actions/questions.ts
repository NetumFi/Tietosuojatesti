import { Action } from '@ngrx/store';
import { Question } from '../questions/questions.model';

export const LOADED = '[Questions] Loaded Questions';
export const INITIALIZED = '[Questions] Initialized random questions';

export class LoadedAction implements Action {
  readonly type = LOADED;

  constructor(public payload: Question[]) {}
}

export class InitializedAction implements Action {
  readonly type = INITIALIZED;

  constructor() {}
}

export type Actions
  = LoadedAction
  | InitializedAction;
