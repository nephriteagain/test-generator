export interface choice {
  id: string
  choice: string;
};

export interface question {
  id: string;
  question: string;
  choices: choice[];
}

export interface unit {
  id: string;
  instructions: string;
  questions: question[];
}

export interface test {  
  subject: string;
  author: string;  
  units: unit[];
  currentUnit: currentUnit
}

export type currentUnit = 'Multiple Choice'

export interface payload {
  name?: string;
  subject?: string;
  id?: string;
  instructions?: string;
  question?: string;
  unitId?: string;
  questionId?: string;
  choiceId?: string;
  text?: string;
  testData?: test|undefined;
  index?: number;
  choiceIndex?: number;
  json?: question;
  unitType?: string;
}

export interface action {
  type: (
      'change_name'|'change_subject'|'add_unit'|'change_instructions'|
      'add_question'|'edit_question'|'delete_question'|'add_choice'|
      'delete_choice'|'edit_choice'|'delete_unit'|'undo_action'|
      'redo_action'|'insert_choice'|'insert_question'|'set_unit'
  )
  payload?: payload
}

export interface focus {
  unit: string
  question: string;
}