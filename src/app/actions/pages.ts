import { Action } from '@ngrx/store';

export const CHANGED_PAGE = '[Pages] Changed page';

export class ChangedPageAction implements Action {
  readonly type = CHANGED_PAGE;

  constructor(public payload: {pageNumber: number}) {}
}

export type Actions
  = ChangedPageAction;
