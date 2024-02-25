import type { test, action, unit, choice, delete_choice_action } from "../../types/types";

export default function deleteChoice(state: test, action: delete_choice_action) : test {
    const unitId = action.payload.unitId
    const questionId = action.payload.questionId
    const choiceId = action.payload.choiceId

    const newUnit: unit[] = state.units.map(unit => {
        if (unit.id === unitId && unit.questions) {
            const newQ = unit.questions.map(q => {
                if (q.id === questionId && q.choices) {
                    const newChoices : choice[] = q.choices.filter(c => {
                        return c.id !== choiceId
                    })
                    return {
                        ...q,
                        choices: newChoices
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