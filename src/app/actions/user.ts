import { Action } from '@ngrx/store';
import { User } from '../user/user.model';

export const USER_DETAILS_ADDED = '[User] Details Added';

export class UserDetailsAddedAction implements Action {
  readonly type = USER_DETAILS_ADDED;

  constructor(public payload: User) {}
}

export type Actions
  = UserDetailsAddedAction;
