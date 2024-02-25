import type { test, action, unit, delete_matching_question_action,} from "../../types";

export default function deleteMatchingQuestion(state: test, action: delete_matching_question_action) : test {
    const unitId = action.payload.unitId
    const questionId = action.payload.questionId

        const newUnit: unit[] = state.units.map(unit => {
            if (unit.id === unitId && unit.matchingUnit) {
                const { matchingUnit } = unit
                return {
                    ...unit,
                    matchingUnit: {
                        ...matchingUnit,
                        questions: matchingUnit.questions.filter(q => {                            
                            return q.id !== questionId
                        })
                    }
                }
            }

            return unit
        })

        return {
            ...state,
            units: newUnit
        }
}