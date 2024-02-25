
import { test, action, actions } from "../types/types";

import changeName from "../actions/changeName/changeName";
import changeSubject from "../actions/changeSubject/changeSubject";
import addUnit from "../actions/addUnit/addUnit";
import deleteUnit from "../actions/deleteUnit/deleteUnit";
import changeInstructions from "../actions/changeInstructions/changeInstructions";
import addQuestion from "../actions/addQuestion/addQuestion";
import editQuestion from "../actions/editQuestion/editQuestion";
import deleteQuestion from "../actions/deleteQuestion/deleteQuestion";
import addChoice from "../actions/addChoice/addChoice";
import deleteChoice from "../actions/deleteChoice/deleteChoice";
import editChoice from "../actions/editChoice/editChoice";
import undoAction from "../actions/undoAction/undoAction";
import redoAction from "../actions/redoAction/redoAction";
import insertChoice from "../actions/insertChoice/insertChoice";
import insertQuestion from "../actions/insertQuestion/insertQuestion";
import setUnitType from "../actions/setUnitType/setUnitType";
import editMatchingQuestion from '../actions/editMatchingQuestion/editMatchingQuestion'
import editMatchingChoice from "@/actions/editMatchingChoice/editMatchingChoice";
import addMatchingQuestion from "@/actions/addMatchingQuestion/addMatchingQuestion";
import addMatchingChoice from "@/actions/addMatchingChoice/addMatchingChoice";
import deleteMatchingQuestion from "@/actions/deleteMatchingQuestion/deleteMatchingQuestion";
import deleteMatchingChoice from "@/actions/deleteMatchingChoice";
import checkLocalStorage from "@/actions/checkLocalStorage/checkLocalStorage";

export default function (state: test, action: action) : test {
    if (action.type === actions.changeName) {
        return changeName(state, action)
    }
    if (action.type === actions.changeSubject) {
        return changeSubject(state, action)
    }
    if (action.type === actions.addUnit)  {
        return addUnit(state)
    }
    if (action.type === actions.deleteUnit) {
        return deleteUnit(state, action)
    }
    if (action.type === actions.changeInstructions) {
        return changeInstructions(state, action)
    }
    if (action.type === actions.addQuestion) {
       return addQuestion(state, action)
    }
    if (action.type === actions.editQuestion) {
        return editQuestion(state, action)
    }
    if (action.type === actions.deleteQuestion) {
        return deleteQuestion(state,action)
    }
    if (action.type === actions.addChoice) {
        return addChoice(state, action)
    }
    if (action.type === actions.deleteChoice) {
        return deleteChoice(state, action)
    }
    if (action.type === actions.editChoice) {
        return editChoice(state, action)
    }
    if (action.type === actions.undoAction) {
        return undoAction(state, action)
    }
    if (action.type === actions.redoAction) {
        return redoAction(state, action)
    }
    if (action.type === actions.insertChoice) {
        return insertChoice(state, action)
    }
    if (action.type === actions.insertQuestion) {
        return insertQuestion(state, action)
    }
    if (action.type === actions.setUnit) {
        return setUnitType(state, action)
    }
    if (action.type === actions.editMatchingQuestion) {
        return editMatchingQuestion(state, action)
    }
    if (action.type === actions.editMatchingChoice) {
        return editMatchingChoice(state, action)
    }
    if (action.type === actions.addMatchingQuestion) {
        return addMatchingQuestion(state, action)
    }
    if (action.type === actions.addMatchingChoice) {
        return addMatchingChoice(state,action)
    }
    if (action.type === actions.deleteMatchingQuestion) {
        return deleteMatchingQuestion(state, action)
    }
    if (action.type === actions.deleteMatchingChoice) {
        return deleteMatchingChoice(state, action)
    }
    if (action.type === actions.checkLocalStorage) {
        return checkLocalStorage(state)
    }



    // default
    return state
}