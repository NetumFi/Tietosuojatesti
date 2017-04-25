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

  const pickedQuestions = [];

  const pickedQuestionNumbers = [];
  for (let i = 0; i < amount; i++) {
    const pickedQuestionNumber = pickQuestion(pickedQuestionNumbers, questions.length);
    pickedQuestions.push(questions[pickedQuestionNumber]);
    pickedQuestionNumbers.push(pickedQuestionNumber);
  }

  return pickedQuestions;
}

export function pickQuestion(questionNumbers, maxQuestionNumber): number {
  while (true) {
    const questionNumber = Math.floor(Math.random() * maxQuestionNumber);
    if (questionNumbers.indexOf(questionNumber) === -1) {
      return questionNumber;
    }
  }
}
