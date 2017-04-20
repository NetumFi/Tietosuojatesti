import { Answer, Option, Question } from './questions.model';


export function calculateMaxPoints(question: Question) {
  return question.choices.map((option: Option) => !option.correct ? 0 : 1).reduce((sum, current) => sum + current, 0);
}

export function calculateUserPoints(question: Question, answers: Answer[]) {
  return question.choices
    .filter((option: Option) => answers.some((answer: Answer) => answer.optionId === option.id && answer.checked))
    .map((option: Option) => !option.correct ? -1 : 1).reduce((sum, current) => sum + current, 0);
}

export function pickQuestions(questions: Question[], amount): Question[] {
  if (amount === 0) {
    return [];
  }

  return pickQuestion(questions, pickQuestions(questions, amount - 1));
}

function pickQuestion(questions: Question[], result: Question[]) {
  if (questions.length > 0) {
    const chosenIndex = Math.floor(Math.random() * questions.length);
    result.push(questions.splice(chosenIndex, 1)[0]);
  }
  return result;
}
