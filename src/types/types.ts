export interface choice {
  id: string
  choice: string;
};


export interface question {
  id: string;
  question: string;
  choices?: choice[];
}

export interface matchingUnit {
  id: string;
  questions: matching[];
  choices: matching[];
}

export interface matching {
  item: string;
  id: string;
}


export interface unit {
  type: unitType
  id: string;
  instructions: string;
  questions?: question[];
  matchingUnit?: matchingUnit
}


export enum unitType {
  multipleChoice =  'Multiple Choice',
  shortAnswer = 'Short Answer', 
  matching = 'Matching',
  essay = 'Essay',
}

export interface test {  
  subject: string;
  author: string;  
  units: unit[];
  currentUnit: unitType
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
  testData?: test|undefined;
  index?: number;
  choiceIndex?: number;
  json?: question;
  unitType?: string;
}

export enum actions {
  changeName = 'change_name',
  changeSubject = 'change_subject',
  addUnit = 'add_unit',
  changeInstructions = 'change_instructions',
  addQuestion = 'add_question',
  editQuestion = 'edit_question',
  deleteQuestion = 'delete_question',
  addChoice = 'add_choice',
  deleteChoice = 'delete_choice',
  editChoice = 'edit_choice',
  deleteUnit = 'delete_unit',
  undoAction = 'undo_action',
  redoAction = 'redo_action',
  insertChoice = 'insert_choice',
  insertQuestion = 'insert_question',
  setUnit = 'set_unit',
  editMatchingQuestion = 'edit_matching_question',
  editMatchingChoice = 'edit_matching_choice',
  addMatchingQuestion = 'add_matching_question',
  addMatchingChoice = 'add_matching_choice',
  deleteMatchingQuestion = 'delete_matching_question',
  deleteMatchingChoice = 'delete_matching_choice',
}

export interface action {
  type: actions
  payload?: payload
}

export interface focus {
  unit: string
  question: string;
  type?: unitType
}