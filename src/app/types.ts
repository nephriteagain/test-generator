export type choice = {
  id: string
  choice: string;
};

export interface question {
  id: string
  question: string;
  choices: choice[];
}

export type unit = {
  id: string;
  instructions: string;
  questions: question[];
}

export interface test {  
  subject?: string;
  author?: string;  
  units: unit[];
}