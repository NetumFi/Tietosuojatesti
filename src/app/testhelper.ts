export function getMockedQuestions(amount) {
  const mockedQuestions = [];
  for (let i = 0; i < amount; ++i) {
    mockedQuestions.push(getMockedQuestion(i + 1));
  }
  return mockedQuestions;
}

function getMockedQuestion(number) {
  return {
    id: 'q' + number,
    text: 'Question ' + number,
    choices: []
  };
}

