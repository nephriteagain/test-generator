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

export type change_name_action = {
    type: actions.changeName,
    payload: {
        name: string
    }
}

export type change_subject_action = {
    type: actions.changeSubject,
    payload: {
        subject: string
    }
}

export type add_unit_action = {
    type: actions.addUnit,
}

export type change_instructions_action = {
    type: actions.changeInstructions,
    payload: {
        instructions: string;
        id: string;
    }
}

export type add_question_action = {
    type: actions.addQuestion,
    payload: {
        id: string;        
    }
}

export type edit_question_action = {
    type: actions.editQuestion,
    payload: {
        question: string;
        unitId: string;
        questionId: string;
    }
}

export type delete_question_action = {
    type: actions.deleteQuestion,
    payload: {
        questionId: string;
        unitId: string;
    }
}

export type add_choice_action = {
    type: actions.addChoice,
    payload: {
        unitId: string;
        questionId: string;
    }
}

export type delete_choice_action = {
    type: actions.deleteChoice,
    payload: {
        unitId: string;
        questionId: string;
        choiceId: string;
    }
}

export type edit_choice_action = {
    type: actions.editChoice,
    payload: {
        unitId: string;
        questionId: string;
        choiceId: string;
        text: string;
    }
}

export type delete_unit_action = {
    type: actions.deleteUnit,
    payload: {
        unitId: string;
    }
}

export type undo_action = {
    type: actions.undoAction,
    payload: {
        testData?: test
    }
}

export type redo_action = {
    type: actions.redoAction,
    payload: {
        testData?: test
    }
}

export type insert_choice_action = {
    type: actions.insertChoice,
    payload: {
        index: number;
        unitId: string;
        questionId: string;
        choiceId: string;
        text: string;
    }
}

export type insert_question_action = {
    type: actions.insertQuestion,
    payload: {
        index: number;
        unitId: string;
        questionId: string;
        json: question
    }
}

export type set_unit_action = {
    type: actions.setUnit,
    payload: {
        unitType: unitType
    }
}

export type edit_matching_question_action = {
    type: actions.editMatchingQuestion,
    payload: {
        unitId: string;
        questionId: string;
        text: string;
    }
}

export type edit_matching_choice_action = {
    type: actions.editMatchingChoice,
    payload: {
        unitId: string;
        choiceId: string;
        text: string;
    }
}

export type add_matching_question_action = {
    type: actions.addMatchingQuestion,
    payload: {
        unitId: string;
    }
}

export type add_matching_choice_action = {
    type: actions.addMatchingChoice,
    payload: {
        unitId: string;
    }
}

export type delete_matching_question_action = {
    type: actions.deleteMatchingQuestion,
    payload: {
        unitId: string;
        questionId: string;
    }
}

export type delete_matching_choice_action = {
    type: actions.deleteMatchingChoice,
    payload: {
        unitId: string;
        choiceId: string;
    }
}

export type check_local_storage_action = {
    type: actions.checkLocalStorage,
}

export type action = (
    change_name_action
    |change_subject_action
    |add_unit_action
    |change_instructions_action
    |add_question_action
    |edit_question_action
    |delete_question_action
    |add_choice_action
    |delete_choice_action
    |edit_choice_action
    |delete_unit_action
    |undo_action
    |redo_action
    |insert_choice_action
    |insert_question_action
    |set_unit_action
    |edit_matching_question_action
    |edit_matching_choice_action
    |add_matching_question_action
    |add_matching_choice_action
    |delete_matching_question_action
    |delete_matching_choice_action
    |check_local_storage_action
)


export interface focus {
    unit: string
    question: string;
    type?: unitType
}