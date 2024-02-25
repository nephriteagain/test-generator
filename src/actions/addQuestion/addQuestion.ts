import { add_question_action } from "@/types/actions";
import type { test,  action, question, unit,  } from "../../types";
import { generateId } from "../../utils/helpers";

export default function addQuestion(state: test, action: add_question_action ) : test {
    const question : question = {
        id: generateId(),
        question: '',
        choices: [
            {id: generateId(), choice: ''},
            {id: generateId(), choice: ''},
            {id: generateId(), choice: ''},
        ]
    }        
    const unitId = action.payload.id
    const newUnits : unit[] = state.units.map(unit => {
        if (unit.id === unitId && unit.questions) {
            return {
                ...unit,
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