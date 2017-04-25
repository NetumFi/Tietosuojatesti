import { Action } from '@ngrx/store';
import { User } from '../user/user.model';

export const DETAILS_ADDED = '[User] Details Added';
export const POINTS_ADDED = '[User] Points Added';
export const POINTS_RESET = '[User] Points Reset';

export class DetailsAddedAction implements Action {
  readonly type = DETAILS_ADDED;

  constructor(public payload: User) {}
}

export class PointsAddedAction implements Action {
  readonly type = POINTS_ADDED;

  constructor(public payload: number) {}
}

export class PointsResetAction implements Action {
  readonly type = POINTS_RESET;

  constructor() {}
}

export type Actions
  = DetailsAddedAction
  | PointsAddedAction
  | PointsResetAction;
