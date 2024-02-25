import { edit_question_action } from "@/types/actions";
import type { test, action, unit,  } from "../../types";

export default function editQuestion(state: test, action: edit_question_action) : test {
    const newQuestion = action.payload.question
        const unitId = action.payload.unitId;
        const questionId = action.payload.questionId

        const newUnits: unit[] = state.units.map(unit => {
            if (unit.id === unitId && unit.questions) {
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