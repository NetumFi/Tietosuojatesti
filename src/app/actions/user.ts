import { Action } from '@ngrx/store';
import { User } from '../user/user.model';

export const DETAILS_ADDED = '[User] Details Added';

export class DetailsAddedAction implements Action {
  readonly type = DETAILS_ADDED;

  constructor(public payload: User) {}
}

export type Actions
  = DetailsAddedAction;
