import { Question } from '../questions/questions.model';
import { calculateMaxPoints, pickQuestions } from '../questions/questionhelper';
import * as questions from '../actions/questions';

export interface State {
  allQuestions: Question[];
  pickedQuestions: Question[];
  maxPoints: number;
}

export const initialState: State = {
  allQuestions: [],
  pickedQuestions: [],
  maxPoints: 0
};

export function reducer(state = initialState, action: questions.Actions): State {
  switch (action.type) {
    case questions.LOADED : {
      const questions = action.payload;
      return {
        allQuestions: questions,
        pickedQuestions: [],
        maxPoints: 0
      };
    }
    case questions.INITIALIZED: {
      const pickedQuestions = pickQuestions(state.allQuestions, 10);
      const maxPoints = calculateMaxPoints(pickedQuestions);
      return {
        allQuestions: state.allQuestions,
        pickedQuestions: pickedQuestions,
        maxPoints: maxPoints
      };
    }
  }
  return state;
}
