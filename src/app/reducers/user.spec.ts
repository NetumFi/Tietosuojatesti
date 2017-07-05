import * as fromUser from './user';
import { DetailsAddedAction } from '../actions/user';

describe('reducer: userReducer', () => {
  let originalState: fromUser.State;

  beforeEach(() => {
    originalState = {
      user: { name: '', title: '', organization: '' }
    };
  });

  it('should add user details', () => {
    const payload = { name: 'John Doe', title: 'Reporter', organization: 'Dantes' };
    expect(fromUser.reducer(originalState, new DetailsAddedAction(payload))).toEqual({
      user: payload
    });
  });
});

