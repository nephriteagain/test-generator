import { test, unit, question } from './../types';
import { generateId } from '../helpers';


export default function addUnit(state: test) : test {
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
        questions: newQuestions
    }
    return {
        ...state,
        units: [...state.units, unit]
    }
}