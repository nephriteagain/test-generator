import { generateId } from "../app/helpers";

import type { choice, question, unit, test, action } from "../types/types";

import changeName from "../actions/changeName";
import changeSubject from "../actions/changeSubject";
import addUnit from "../actions/addUnit";
import deleteUnit from "../actions/deleteUnit";
import changeInstructions from "../actions/changeInstructions";
import addQuestion from "../actions/addQuestion";
import editQuestion from "../actions/editQuestion";
import deleteQuestion from "../actions/deleteQuestion";
import addChoice from "../actions/addChoice";
import deleteChoice from "../actions/deleteChoice";
import editChoice from "../actions/editChoice";
import undoAction from "../actions/undoAction";
import redoAction from "../actions/redoAction";
import insertChoice from "../actions/insertChoice";
import insertQuestion from "../actions/insertQuestion";
import setUnitType from "../actions/setUnitType";
import editMatchingQuestion from '../actions/editMatchingQuestion'
import editMatchingChoice from "@/actions/editMatchingChoice";
import addMatchingQuestion from "@/actions/addMatchingQuestion";
import addMatchingChoice from "@/actions/addMatchingChoice";
import deleteMatchingQuestion from "@/actions/deleteMatchingQuestion";
import deleteMatchingChoice from "@/actions/deleteMatchingChoice";

export default function (state: test, action: action) : test {
    if (action.type === 'change_name') {
        return changeName(state, action)
    }

    if (action.type === 'change_subject') {
        return changeSubject(state, action)
    }

    if (action.type === 'add_unit')  {
        return addUnit(state)
    }

    if (action.type === 'delete_unit') {
        return deleteUnit(state, action)
    }

    if (action.type === 'change_instructions') {
        return changeInstructions(state, action)
    }

    if (action.type === 'add_question') {
       return addQuestion(state, action)
    }

    if (action.type === 'edit_question') {
        return editQuestion(state, action)
    }

    if (action.type === 'delete_question') {
        return deleteQuestion(state,action)
    }

    if (action.type === 'add_choice') {
        return addChoice(state, action)
    }

    if (action.type === 'delete_choice') {
        return deleteChoice(state, action)
    }

    if (action.type === 'edit_choice') {
        return editChoice(state, action)
    }

    if (action.type === 'undo_action') {
        return undoAction(state, action)
    }

    if (action.type === 'redo_action') {
        return redoAction(state, action)
    }
    if (action.type === 'insert_choice') {
        return insertChoice(state, action)
    }
    if (action.type === 'insert_question') {
        return insertQuestion(state, action)
    }

    if (action.type === 'set_unit') {
        return setUnitType(state, action)
    }

    if (action.type === 'edit_matching_question') {
        return editMatchingQuestion(state, action)
    }

    if (action.type === 'edit_matching_choice') {
        return editMatchingChoice(state, action)
    }

    if (action.type === 'add_matching_question') {
        return addMatchingQuestion(state, action)
    }

    if (action.type === 'add_matching_choice') {
        return addMatchingChoice(state,action)
    }
    if (action.type === 'delete_matching_question') {
        return deleteMatchingQuestion(state, action)
    }
    if (action.type === 'delete_matching_choice') {
        return deleteMatchingChoice(state, action)
    }



    // default
    return state
}