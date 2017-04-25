import * as user from '../actions/user';
import { User } from '../user/user.model';
import { DETAILS_ADDED, POINTS_ADDED, POINTS_RESET } from '../actions/user';

export interface State {
  user: User;
  points: number;
}

export const initialState: State = {
  user: {name: '', title: '', organization: ''},
  points: 0
};

export function reducer(state = initialState, action: user.Actions): State {
  switch(action.type) {
    case DETAILS_ADDED: {
      const user = action.payload;
      return { user: user, points: state.points };
    }
    case POINTS_ADDED: {
      const points = action.payload;
      return { user: state.user, points: (state.points + +points) };
    }
    case POINTS_RESET: {
      return { user : state.user, points: 0 };
    }
  }
  return state;
}
