export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  choices: Option[];
}

export interface Points {
  optionId: string;
  pointsIfChecked: number;
}

export interface Answer {
  optionId: string;
  checked: boolean;
}

