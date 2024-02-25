import type { test, action, unit, delete_question_action } from "../../types";

export default function deleteQuestion(state: test, action: delete_question_action) : test {
    const questionId = action.payload.questionId
        const unitId = action.payload.unitId

        const newUnit: unit[] = state.units.map(unit => {
            if (unit.id === unitId && unit.questions) {
                const newQ = unit.questions.filter(q => {
                    return q.id !== questionId
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
