import { Answer, Option, Question } from './questions.model';


export function calculateMaxPoints(question: Question) {
  return question.choices.map((option: Option) => !option.correct ? 0 : 1).reduce((sum, current) => sum + current, 0);
}

export function calculateUserPoints(question: Question, answers: Answer[]) {
  return question.choices
    .filter((option: Option) => answers.some((answer: Answer) => answer.optionId === option.id && answer.checked))
    .map((option: Option) => !option.correct ? -1 : 1).reduce((sum, current) => sum + current, 0);
}
