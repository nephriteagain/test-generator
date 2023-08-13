export interface choice {
  id: string
  choice: string;
};

export interface question {
  id: string
  question: string;
  choices: choice[];
}

export interface unit {
  id: string;
  instructions: string;
  questions: question[];
}

export interface test {  
  subject?: string;
  author?: string;  
  units: unit[];
}

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
  testData?: test|undefined
}

export interface action {
  type: (
      'change_name'|'change_subject'|'add_unit'|'change_instructions'|
      'add_question'|'edit_question'|'delete_question'|'add_choice'|
      'delete_choice'|'edit_choice'|'delete_unit'|'undo_action'|
      'redo_action'
  )
  payload?: payload
}