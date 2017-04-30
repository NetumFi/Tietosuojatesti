export interface Option {
  id: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  text: string;
  choices: Option[];
}

export interface Answer {
  optionId: string;
  checked: boolean;
  text: string;
}

