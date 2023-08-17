import { test, unit, question, matchingUnit, matching, unitType } from '../types/types';
import { generateId } from '../app/helpers';


export default function addUnit(state: test) : test {
    if (state.currentUnit === unitType.multipleChoice) {
        return addMultipleChoiceUnit(state)
    }
    if (state.currentUnit === unitType.shortAnswer) {
        return  addShortAnswerUnit(state)
    }
    if (state.currentUnit === unitType.matching) {
        return addMatchingUnit(state)
    }
    if (state.currentUnit === unitType.essay) {
        return addEssayUnit(state)
    }

    return state
}

function addMultipleChoiceUnit(state: test) : test {
    const newQuestions: question[] = []
    let i = 0;
    while (i < 2) {
        const newQuestion : question = {
            id: generateId(),
            question: '',
            choices: [
                {id: generateId(), choice: ''},
                {id: generateId(), choice: ''},
                {id: generateId(), choice: ''},
            ]
        }
        newQuestions.push(newQuestion)
        i++
    }

    const unit : unit = {
        id: generateId(),
        instructions: '',
        questions: newQuestions,
        type: unitType.multipleChoice
    }
    return {
        ...state,
        units: [...state.units, unit]
    }
}

function addShortAnswerUnit(state: test) : test {
    const newQuestions : question[] = []
    let i = 0;
    while (i < 2) {
        const newQuestion : question = {
            id: generateId(),
            question: ''
        }
        newQuestions.push(newQuestion);
        i++;
    }

    const unit: unit = {
        id: generateId(),
        instructions: '',
        questions: newQuestions,
        type: unitType.shortAnswer
    }

    return {
        ...state,
        units: [...state.units, unit]
    }
}

function addMatchingUnit(state: test) : test {
    const newMatchingUnit: matchingUnit = {
        id: generateId(),
        questions: [
            {id: generateId(), item: ''},
            {id: generateId(), item: ''},
            {id: generateId(), item: ''},
        ],
        choices: [
            {id: generateId(), item: ''},
            {id: generateId(), item: ''},
            {id: generateId(), item: ''},            
        ]
    }

    const unit: unit = {
        id: generateId(),
        instructions: '',
        type: unitType.matching,
        matchingUnit: newMatchingUnit
    }

    return {
        ...state,
        units: [...state.units, unit]
    }
}

function addEssayUnit(state: test) : test {
    const newEssayQuestions : question[] = [];

    let i = 0;
    while (i < 2) {
        const newQuestion : question = {
            id: generateId(),
            question: '',
            choices: [
                {id: generateId(), choice: ''}
            ]
        }
        newEssayQuestions.push(newQuestion);
        i++;
    }

    const unit: unit = {
        id: generateId(),
        instructions: '',
        questions: newEssayQuestions,
        type: unitType.essay
    }

    return {
        ...state,
        units: [...state.units, unit]
    }
}