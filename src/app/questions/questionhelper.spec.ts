import { calculateMaxPoints, calculateUserPoints } from './questionhelper';

describe('calculateMaxPoints', () => {
  it('should add 0 points for incorrect options', () => {
    const questionWithOnlyIncorrectOptions = {
      'id': 'q1',
      'text': 'Question 1',
      'choices': [
        {
          'id': '001',
          'text': 'Option 1',
          'correct': false
        }
      ]
    };
    expect(calculateMaxPoints(questionWithOnlyIncorrectOptions)).toBe(0);
  });

  it('should add 1 point for correct options', () => {
    const questionWithOnlyCorrectOptions = {
      'id': 'q1',
      'text': 'Question 1',
      'choices': [
        {
          'id': '001',
          'text': 'Option 1',
          'correct': true
        }
      ]
    };
    expect(calculateMaxPoints(questionWithOnlyCorrectOptions)).toBe(1);
  });

  it('should return 0 if no options', () => {
    const questionWithNoOptions = {
      'id': 'q1',
      'text': 'Question 1',
      'choices': []
    };
    expect(calculateMaxPoints(questionWithNoOptions)).toBe(0);
  });
});

describe('calculateUserPoints', () => {
  it('should not add points for not checked answers', () => {
    const questionWithOnlyCorrectOptions = {
      'id': 'q1',
      'text': 'Question 1',
      'choices': [
        {
          'id': '001',
          'text': 'Option 1',
          'correct': true
        }
      ]
    };
    const noCheckedAnswers = [{ 'optionId': '001', 'checked': false }];

    expect(calculateUserPoints(questionWithOnlyCorrectOptions, noCheckedAnswers)).toBe(0);
  });

  it('should add 1 point for correct answer', () => {
    const questionWithOnlyCorrectOptions = {
      'id': 'q1',
      'text': 'Question 1',
      'choices': [
        {
          'id': '001',
          'text': 'Option 1',
          'correct': true
        }
      ]
    };
    const onlyCorrectAnswers = [{ 'optionId': '001', 'checked': true }];

    expect(calculateUserPoints(questionWithOnlyCorrectOptions, onlyCorrectAnswers)).toBe(1);
  });

  it('should add -1 points for incorrect answer', () => {
    const questionWithOnlyIncorrectOptions = {
      'id': 'q1',
      'text': 'Question 1',
      'choices': [
        {
          'id': '001',
          'text': 'Option 1',
          'correct': false
        }
      ]
    };
    const onlyIncorrectAnswers = [{ 'optionId': '001', 'checked': true }];

    expect(calculateUserPoints(questionWithOnlyIncorrectOptions, onlyIncorrectAnswers)).toBe(-1);
  });

  it('should add no points for answer irrelevant to the question', () => {
    const questionWithOnlyCorrectOptions = {
      'id': 'q1',
      'text': 'Question 1',
      'choices': [
        {
          'id': '001',
          'text': 'Option 1',
          'correct': false
        }
      ]
    };
    const onlyIrrelevantAnswers = [{ 'optionId': '999', 'checked': true }];

    expect(calculateUserPoints(questionWithOnlyCorrectOptions, onlyIrrelevantAnswers)).toBe(0);
  });

  it('should return 0 for empty array of answers', () => {
    const questionWithOnlyCorrectOptions = {
      'id': 'q1',
      'text': 'Question 1',
      'choices': [
        {
          'id': '001',
          'text': 'Option 1',
          'correct': false
        }
      ]
    };
    const noAnswers = [];

    expect(calculateUserPoints(questionWithOnlyCorrectOptions, noAnswers)).toBe(0);
  });
});
