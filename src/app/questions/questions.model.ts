export interface Option {
  id: string;
  fi: string;
  sv: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  index: number;
  fi: string;
  sv: string;
  text: string;
  choices: Option[];
}

export interface Answer {
  optionId: string;
  checked: boolean;
  text: string;
}

