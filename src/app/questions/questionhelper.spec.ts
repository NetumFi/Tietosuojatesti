import { calculateMaxPoints, calculateUserPoints, pickQuestions } from './questionhelper';
import { Question } from './questions.model';
import { getMockedQuestion } from '../testhelper';

describe('calculateMaxPoints', () => {
  it('should add 0 points for incorrect options', () => {
    const questionWithOnlyIncorrectOptions = {
      id: 'q1',
      text: 'Question 1',
      choices: [
        {
          id: '001',
          text: 'Option 1',
          correct: false
        }
      ]
    };
    expect(calculateMaxPoints([questionWithOnlyIncorrectOptions])).toBe(0);
  });

  it('should add 1 point for correct options', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      text: 'Question 1',
      choices: [
        {
          id: '001',
          text: 'Option 1',
          correct: true
        }
      ]
    };
    expect(calculateMaxPoints([questionWithOnlyCorrectOptions])).toBe(1);
  });

  it('should return 0 if no options', () => {
    const questionWithNoOptions = {
      id: 'q1',
      text: 'Question 1',
      choices: []
    };
    expect(calculateMaxPoints([questionWithNoOptions])).toBe(0);
  });
});

describe('calculateUserPoints', () => {
  it('should not add points for not checked answers', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      text: 'Question 1',
      choices: [
        {
          id: '001',
          text: 'Option 1',
          correct: true
        }
      ]
    };
    const noCheckedAnswers = [{ optionId: '001', checked: false, text: '' }];

    expect(calculateUserPoints(questionWithOnlyCorrectOptions, noCheckedAnswers)).toBe(0);
  });

  it('should add 1 point for correct answer', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      text: 'Question 1',
      choices: [
        {
          id: '001',
          text: 'Option 1',
          correct: true
        }
      ]
    };
    const onlyCorrectAnswers = [{ optionId: '001', checked: true, text: '' }];

    expect(calculateUserPoints(questionWithOnlyCorrectOptions, onlyCorrectAnswers)).toBe(1);
  });

  it('should add -1 points for incorrect answer', () => {
    const questionWithOnlyIncorrectOptions = {
      id: 'q1',
      text: 'Question 1',
      choices: [
        {
          id: '001',
          text: 'Option 1',
          correct: false
        }
      ]
    };
    const onlyIncorrectAnswers = [{ optionId: '001', checked: true, text: '' }];

    expect(calculateUserPoints(questionWithOnlyIncorrectOptions, onlyIncorrectAnswers)).toBe(-1);
  });

  it('should add no points for answer irrelevant to the question', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      text: 'Question 1',
      choices: [
        {
          id: '001',
          text: 'Option 1',
          correct: false
        }
      ]
    };
    const onlyIrrelevantAnswers = [{ optionId: '999', checked: true, text: '' }];

    expect(calculateUserPoints(questionWithOnlyCorrectOptions, onlyIrrelevantAnswers)).toBe(0);
  });

  it('should return 0 for empty array of answers', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      text: 'Question 1',
      choices: [
        {
          id: '001',
          text: 'Option 1',
          correct: false
        }
      ]
    };
    const noAnswers = [];

    expect(calculateUserPoints(questionWithOnlyCorrectOptions, noAnswers)).toBe(0);
  });
});

describe('pickQuestions', () => {
  it('should pick the only question in the array', () => {
    expect(pickQuestions(Array.of(getMockedQuestion(1)), 10).length).toBe(1);
  });

  it('should pick 10 questions from 50', () => {
    const questions: Question[] = [];
    for (let i = 0; i < 50; ++i) {
      questions.push(getMockedQuestion(i + 1));
    }
    const pickedQuestions = pickQuestions(questions, 10);
    expect(pickedQuestions.length).toBe(10);
  });

  it('all 10 picked questions should be unique', () => {
    const questions: Question[] = [];
    for (let i = 0; i < 50; ++i) {
      questions.push(getMockedQuestion(i + 1));
    }
    const pickedQuestions = pickQuestions(questions, 10);
    pickedQuestions.forEach(q1 => expect(pickedQuestions.filter(q2 => q1.id === q2.id).length).toBe(1));
  });
});

