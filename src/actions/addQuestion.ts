import type { test,  action, question, unit } from "../types/types";
import { generateId } from "../app/helpers";

export default function addQuestion(state: test, action: action) : test {
    const question : question = {
        id: generateId(),
        question: '',
        choices: [
            {id: generateId(), choice: ''},
            {id: generateId(), choice: ''},
            {id: generateId(), choice: ''},
        ]
    }        
    const unitId = action.payload?.id as string
    const newUnits : unit[] = state.units.map(unit => {
        if (unit.id === unitId) {
            return {
                ...unit,
                // @ts-ignore
                questions: [...unit.questions, question]
            }
        }
        return unit
    })

    return {
        ...state,
        units: newUnits
    }
}