import * as dispatch_action from './actions' // used to avoid long imports dont refactor

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
    checkLocalStorage = 'check_local_storage'
}


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


export type action = (
    dispatch_action.change_name_action
    |dispatch_action.change_subject_action
    |dispatch_action.add_unit_action
    |dispatch_action.change_instructions_action
    |dispatch_action.add_question_action
    |dispatch_action.edit_question_action
    |dispatch_action.delete_question_action
    |dispatch_action.add_choice_action
    |dispatch_action.delete_choice_action
    |dispatch_action.edit_choice_action
    |dispatch_action.delete_unit_action
    |dispatch_action.undo_action
    |dispatch_action.redo_action
    |dispatch_action.insert_choice_action
    |dispatch_action.insert_question_action
    |dispatch_action.set_unit_action
    |dispatch_action.edit_matching_question_action
    |dispatch_action.edit_matching_choice_action
    |dispatch_action.add_matching_question_action
    |dispatch_action.add_matching_choice_action
    |dispatch_action.delete_matching_question_action
    |dispatch_action.delete_matching_choice_action
    |dispatch_action.check_local_storage_action
)


export interface focus {
    unit: string
    question: string;
    type?: unitType
}