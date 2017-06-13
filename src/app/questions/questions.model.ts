export interface Option {
  id: string;
  fi: string;
  sv: string;
  correct: boolean;
}

export interface Question {
  id: string;
  index: number;
  fi: string;
  sv: string;
  choices: Option[];
}

export interface Answer {
  optionId: string;
  checked: boolean;
}

