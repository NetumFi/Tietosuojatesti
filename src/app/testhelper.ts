export function getMockedQuestion(number) {
  return {
    id: 'q' + number,
    text: 'Question ' + number,
    choices: []
  };
}

