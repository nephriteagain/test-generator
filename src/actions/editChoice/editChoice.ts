import type { test, action, unit, choice, edit_choice_action } from "../../types";

export default function editChoice(state: test, action: edit_choice_action) : test {
    const unitId = action.payload.unitId
        const questionId = action.payload.questionId
        const choiceId = action.payload.choiceId
        const value = action.payload.text

        const newUnit: unit[] = state.units.map(unit => {
            if (unit.id === unitId && unit.questions) {
                const newQ = unit.questions.map(q => {
                    if (q.id === questionId && q.choices) {
                        const newChoices : choice[] = q.choices.map((c) => {
                            if (c.id === choiceId) {
                                return {
                                    ...c,
                                    choice: value
                                }
                            }
                            return c
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