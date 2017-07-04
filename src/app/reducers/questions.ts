import { Answer, Question } from '../questions/questions.model';
import { areAnswersCorrect, calculateMaxPoints, calculateUserPoints, pickQuestions } from '../questions/questionhelper';
import * as questions from '../actions/questions';

export interface State {
  allQuestions: Question[];
  pickedQuestions: Question[];
  answers: boolean[]; // index should match pickedQuestions
  questionPoints: number[]; // -- " --
  maxPoints: number;
  allAnswers: Answer[];
}

export const initialState: State = {
  allQuestions: [],
  pickedQuestions: [],
  answers: [],
  questionPoints: [],
  maxPoints: 0,
  allAnswers: []
};

export function reducer(state = initialState, action: questions.Actions): State {
  switch (action.type) {
    case questions.LOADED : {
      const questions = action.payload;
      return {
        allQuestions: questions,
        pickedQuestions: [],
        answers: [],
        questionPoints: [],
        maxPoints: 0,
        allAnswers: []
      };
    }
    case questions.INITIALIZED: {
      const pickedQuestions = pickQuestions(state.allQuestions, 10);
      const maxPoints = calculateMaxPoints(pickedQuestions);
      return {
        allQuestions: state.allQuestions,
        pickedQuestions: pickedQuestions,
        answers: [],
        questionPoints: [],
        maxPoints: maxPoints,
        allAnswers: []
      };
    }
    case questions.ANSWERED: {
      const questionIndex = action.questionIndex;
      const answer = areAnswersCorrect(state.pickedQuestions[questionIndex], action.answers);
      const newAnswerState = [...state.answers];
      newAnswerState[questionIndex] = answer;
      const points = calculateUserPoints(state.pickedQuestions[questionIndex], action.answers);
      const newPointsState = [...state.questionPoints];
      newPointsState[questionIndex] = points;
      // all previous answers filtered out from new state and new answers added
      const newAllAnswersState = state.allAnswers
        .filter(existingAnswer => !action.answers.some(newAnswer => existingAnswer.optionId === newAnswer.optionId));
      action.answers.forEach(replacingAnswer => newAllAnswersState.push(replacingAnswer));

      const newState = {
        allQuestions: state.allQuestions,
        pickedQuestions: state.pickedQuestions,
        answers: newAnswerState,
        questionPoints: newPointsState,
        maxPoints: state.maxPoints,
        allAnswers: newAllAnswersState
      };
      return newState;
    }
  }
  return state;
}
