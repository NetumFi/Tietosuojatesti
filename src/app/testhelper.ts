export function getMockedQuestions(amount) {
  const mockedQuestions = [];
  for (let i = 0; i < amount; ++i) {
    mockedQuestions.push(getMockedQuestion(i + 1));
  }
  return mockedQuestions;
}

function getMockedQuestion(number) {
  let questionId = 'q' + number;
  return {
    id: questionId,
    text: 'Question ' + number,
    choices: [
      getMockedOption(questionId, 1, false),
      getMockedOption(questionId, 2, true)
    ]
  };
}

function getMockedOption(questionId, number, correct) {
  return {
    id: questionId + '-' + number,
    text: (!correct ? 'Incorrect option ' : 'Correct option ') + number,
    correct: correct
  };
}

