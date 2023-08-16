import type { test, action, unit } from "../types/types";

export default function editQuestion(state: test, action: action) : test {
    const newQuestion = action.payload?.question as string;
        const unitId = action.payload?.unitId as string;
        const questionId = action.payload?.questionId as string

        const newUnits: unit[] = state.units.map(unit => {
            if (unit.id === unitId) {
                const newQ = unit.questions.map((q) => {
                    if (q.id === questionId) {
                        return {
                            ...q,
                            question: newQuestion
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
            units: newUnits
        }
}