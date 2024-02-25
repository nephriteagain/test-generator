import type { test, action, unit, choice } from "../../types";
import { add_choice_action } from "@/types/actions"
import { generateId } from "../../utils/helpers";

export default function addChoice(state: test, action: add_choice_action) : test {
    const newChoice : choice = {
        id: generateId(),
        choice: ''
    }
    
    const unitId = action.payload.unitId
    const questionId = action.payload.questionId

    const newUnit: unit[] = state.units.map(unit => {
        if (unit.id === unitId && unit.questions) {
            const newQ = unit.questions.map(q => {
                if (q.id === questionId && q.choices) {
                    return {
                        ...q,
                        choices: [...q.choices, newChoice]
                    }
                }

                return q
            })
            return {
                ...unit,
                questions: newQ
            }
        }

        return unit
    })

    return {
        ...state,
        units: newUnit
    }
}