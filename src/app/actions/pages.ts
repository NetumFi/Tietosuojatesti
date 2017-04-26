import { Action } from '@ngrx/store';

export const CHANGED_PAGE = '[Pages] Changed page';
export const INITIALIZED_AMOUNT_OF_PAGES = '[Pages] Initialized amount of pages';

export class ChangedPageAction implements Action {
  readonly type = CHANGED_PAGE;

  constructor(public payload: {pageNumber: number}) {}
}

export class InitializedAmountOfPagesAction implements Action {
  readonly type = INITIALIZED_AMOUNT_OF_PAGES;

  constructor(public payload: {amountOfPages: number}) {}
}

export type Actions
  = ChangedPageAction
  | InitializedAmountOfPagesAction;
