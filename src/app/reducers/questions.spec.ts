import * as fromQuestions from './questions';
import { InitializedAction, LoadedAction } from '../actions/questions';
import { getMockedQuestions } from '../testhelper';

describe("reducer: questionsReducer", () => {
  it("should load questions", () => {
    const originalState = {
      allQuestions: [],
      pickedQuestions: [],
      maxPoints: 0
    };

    const payload = getMockedQuestions(50);

    expect(fromQuestions.reducer(originalState, new LoadedAction(payload))).toEqual({
      allQuestions: payload,
      pickedQuestions: [],
      maxPoints: 0
    });
  });

  it("should pick 10 from all questions", () => {
    const originalState = {
      allQuestions: getMockedQuestions(50),
      pickedQuestions: [],
      maxPoints: 0
    }
    const stateAfter: fromQuestions.State = fromQuestions.reducer(originalState, new InitializedAction());
    expect(stateAfter.allQuestions).toEqual(originalState.allQuestions);
    expect(stateAfter.pickedQuestions.length).toBe(10);
    stateAfter.pickedQuestions.forEach(pick => expect(originalState.allQuestions.some(question => question.id === pick.id)));
    expect(stateAfter.maxPoints).toBe(10) // every mocked question has one correct option
  });
});
