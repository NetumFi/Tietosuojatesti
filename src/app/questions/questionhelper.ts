import { Answer, Option, Question } from './questions.model';


export function calculateMaxPoints(questions: Question[]) {
  let total = 0;
  questions.forEach(question => total += question.choices
    .map((option: Option) => !option.correct ? 0 : 1)
    .reduce((sum, current) => sum + current, 0));
  return total;
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

function pickQuestion(questions: Question[], picks: Question[]) {
  const availableQuestions = questions.filter(question => !picks.some(pick => pick.id === question.id));
  if (availableQuestions.length > 0) {
    const chosenIndex = Math.floor(Math.random() * availableQuestions.length);
    picks.push(availableQuestions[chosenIndex]);
  }
  return picks;
}
