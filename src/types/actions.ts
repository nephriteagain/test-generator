import { actions, test, question, unitType } from "./index"

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