import { Question } from '../questions/questions.model';
import { areAnswersCorrect, calculateMaxPoints, pickQuestions } from '../questions/questionhelper';
import * as questions from '../actions/questions';

export interface State {
  allQuestions: Question[];
  pickedQuestions: Question[];
  answers: boolean[]; // index should match pickedQuestions
  maxPoints: number;
}

export const initialState: State = {
  allQuestions: [],
  pickedQuestions: [],
  answers: [],
  maxPoints: 0
};

export function reducer(state = initialState, action: questions.Actions): State {
  switch (action.type) {
    case questions.LOADED : {
      const questions = action.payload;
      return {
        allQuestions: questions,
        pickedQuestions: [],
        answers: [],
        maxPoints: 0
      };
    }
    case questions.INITIALIZED: {
      const pickedQuestions = pickQuestions(state.allQuestions, 10);
      const maxPoints = calculateMaxPoints(pickedQuestions);
      return {
        allQuestions: state.allQuestions,
        pickedQuestions: pickedQuestions,
        answers: [],
        maxPoints: maxPoints
      };
    }
    case questions.ANSWERED: {
      const questionIndex = action.questionIndex;
      const answer = areAnswersCorrect(state.pickedQuestions[questionIndex], action.answers);
      const newAnswerState = [...state.answers];
      newAnswerState[questionIndex] = answer;
      const newState = {
        allQuestions: state.allQuestions,
        pickedQuestions: state.pickedQuestions,
        answers: newAnswerState,
        maxPoints: state.maxPoints
      };
      return newState;
    }
  }
  return state;
}
