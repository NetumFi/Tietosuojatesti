import * as fromUser from './user';
import { DetailsAddedAction, PointsAddedAction, PointsResetAction } from '../actions/user';

describe("reducer: userReducer", () => {
  let originalState: fromUser.State

  beforeEach(() => {
    originalState = {
      user: { name: '', title: '', organization: '' },
      points: 1
    };
  });

  it("should add user details", () => {
    const payload = { name: 'John Doe', title: 'Reporter', organization: 'Dantes' };
    expect(fromUser.reducer(originalState, new DetailsAddedAction(payload))).toEqual({
      user: payload,
      points: 1
    });
  });

  it("should add user points", () => {
    const payload =  999;
    expect(fromUser.reducer(originalState, new PointsAddedAction(payload))).toEqual({
      user: { name: '', title: '', organization: '' },
      points: 1000
    });
  });

  it("should reset user points", () => {
    originalState = {
      user: { name: 'John Doe', title: 'Reporter', organization: 'Dantes' },
      points: 999
    };

    expect(fromUser.reducer(originalState, new PointsResetAction())).toEqual({
      user: { name: 'John Doe', title: 'Reporter', organization: 'Dantes' },
      points: 0
    });
  });
});

