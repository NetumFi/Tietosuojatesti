import * as user from '../actions/user';
import { User } from '../user/user.model';
import { DETAILS_ADDED } from '../actions/user';

export interface State {
  user: User;
}

export const initialState: State = {
  user: {name: '', title: '', organization: ''},
};

export function reducer(state = initialState, action: user.Actions): State {
  switch (action.type) {
    case DETAILS_ADDED: {
      const user = action.payload;
      return { user: user };
    }
  }
  return state;
}
