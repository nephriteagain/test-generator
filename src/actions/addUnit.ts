import { test, unit, question, shortAnswerQuestion } from '../types/types';
import { generateId } from '../app/helpers';


export default function addUnit(state: test) : test {
    if (state.currentUnit === 'Multiple Choice') {
        return addMultipleChoiceUnit(state)
    }
    if (state.currentUnit === 'Short Answer') {
        return  addShortAnswerUnit(state)
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
    const newQuestions : shortAnswerQuestion[] = []
    let i = 0;
    while (i < 2) {
        const newQuestion : shortAnswerQuestion = {
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