import { test, unit, question, matchingUnit, matching } from '../types/types';
import { generateId } from '../app/helpers';


export default function addUnit(state: test) : test {
    if (state.currentUnit === 'Multiple Choice') {
        return addMultipleChoiceUnit(state)
    }
    if (state.currentUnit === 'Short Answer') {
        return  addShortAnswerUnit(state)
    }
    if (state.currentUnit === 'Matching') {
        return addMatchingUnit(state)
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
        type: 'Multiple Choice'
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
        type: 'Short Answer'
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
        type: 'Matching',
        matchingUnit: newMatchingUnit
    }

    return {
        ...state,
        units: [...state.units, unit]
    }
}