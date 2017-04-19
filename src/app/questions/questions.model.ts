export interface Option {
  id: string;
  text: string;
  pointsIfChecked: number;
}

export interface Question {
  id: string;
  text: string;
  choices: Option[];
}

export interface Answer {
  optionId: string;
  checked: boolean;
}

