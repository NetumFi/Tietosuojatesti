import { areAnswersCorrect, calculateMaxPoints, calculateUserPoints, pickQuestions } from './questionhelper';
import { getMockedQuestions } from '../testhelper';

describe('calculateMaxPoints', () => {
  it('should add 0 points for incorrect options', () => {
    const questionWithOnlyIncorrectOptions = {
      id: 'q1',
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
          correct: false
        }
      ]
    };
    expect(calculateMaxPoints([questionWithOnlyIncorrectOptions])).toBe(0);
  });

  it('should add 1 point for correct options', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
          correct: true
        }
      ]
    };
    expect(calculateMaxPoints([questionWithOnlyCorrectOptions])).toBe(1);
  });

  it('should return 0 if no options', () => {
    const questionWithNoOptions = {
      id: 'q1',
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: []
    };
    expect(calculateMaxPoints([questionWithNoOptions])).toBe(0);
  });
});

describe('calculateUserPoints', () => {
  it('should not add points for not checked answers', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
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
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
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
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
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
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
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
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
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
    expect(pickQuestions(getMockedQuestions(1), 10).length).toBe(1);
  });

  it('should pick 10 questions from 50', () => {
    const pickedQuestions = pickQuestions(getMockedQuestions(50), 10);
    expect(pickedQuestions.length).toBe(10);
  });

  it('all 10 picked questions should be unique', () => {
    const pickedQuestions = pickQuestions(getMockedQuestions(50), 10);
    pickedQuestions.forEach(q1 => expect(pickedQuestions.filter(q2 => q1.id === q2.id).length).toBe(1));
  });
});

describe('areAnswersCorrect', () => {
  it('It should return false if no correct answer is given', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
          correct: true
        }
      ]
    };
    const noCheckedAnswers = [{ optionId: '001', checked: false }];

    expect(areAnswersCorrect(questionWithOnlyCorrectOptions, noCheckedAnswers)).toBeFalsy();
  });

  it('It should return false if any incorrect answer is given', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
          correct: true
        },
        {
          id: '021',
          fi: 'Option 2',
          sv: 'Option 2',
          correct: true
        }
      ]
    };
    const noCheckedAnswers = [{ optionId: '001', checked: false }];

    expect(areAnswersCorrect(questionWithOnlyCorrectOptions, noCheckedAnswers)).toBeFalsy();
  });

  it('It should return true for only correct answers (first answer correct, second incorrect)', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
          correct: true
        },
        {
          id: '002',
          fi: 'Option 2',
          sv: 'Option 2',
          correct: false
        }
      ]
    };
    const onlyCorrectAnswers = [{ optionId: '001', checked: true }, { optionId: '002', checked: false }];

    expect(areAnswersCorrect(questionWithOnlyCorrectOptions, onlyCorrectAnswers)).toBeTruthy();
  });

  it('It should return true for only correct answers (all answers correct)', () => {
    const questionWithOnlyCorrectOptions = {
      id: 'q1',
      index: 1,
      fi: 'Question 1',
      sv: 'Question 1',
      choices: [
        {
          id: '001',
          fi: 'Option 1',
          sv: 'Option 1',
          correct: true
        },
        {
          id: '002',
          fi: 'Option 2',
          sv: 'Option 2',
          correct: true
        }
      ]
    };
    const onlyCorrectAnswers = [{ optionId: '001', checked: true }, { optionId: '002', checked: true }];

    expect(areAnswersCorrect(questionWithOnlyCorrectOptions, onlyCorrectAnswers)).toBeTruthy();
  });

});

