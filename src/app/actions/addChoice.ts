import type { test, action, unit, choice } from "../types";
import { generateId } from "../helpers";

export default function addChoice(state: test, action: action) : test {
    const newChoice : choice = {
        id: generateId(),
        choice: ''
    }
    
    const unitId = action?.payload?.unitId as string;
    const questionId = action?.payload?.questionId as string;

    const newUnit: unit[] = state.units.map(unit => {
        if (unit.id === unitId) {
            const newQ = unit.questions.map(q => {
                if (q.id === questionId) {
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