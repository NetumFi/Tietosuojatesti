import { Action } from '@ngrx/store';
import { Question } from '../questions/questions.model';

export const QUESTIONS_LOADED = '[Questions] Loaded Questions';
export const QUESTIONS_PICKED = '[Questions] Picked random questions';

export class QuestionsLoadedAction implements Action {
  readonly type = QUESTIONS_LOADED;

  constructor(public payload: Question[]) {}
}

export class RandomQuestionsPickedAction implements Action {
  readonly type = QUESTIONS_PICKED;

  constructor(public payload: Question[]) {}
}

export type Actions
  = QuestionsLoadedAction
  | RandomQuestionsPickedAction;
