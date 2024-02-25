import type { test, action, unit, edit_matching_question_action,} from "../../types";

export default function editMatchingQuestion(state: test, action: edit_matching_question_action) : test {
    const unitId = action?.payload?.unitId as string;
    const questionId = action.payload?.questionId as string;
    const text = action.payload?.text as string;

        const newUnit: unit[] = state.units.map(unit => {
            if (unit.id === unitId && unit.matchingUnit) {
                const { matchingUnit } = unit
                return {
                    ...unit,
                    matchingUnit: {
                        ...matchingUnit,
                        questions: matchingUnit.questions.map(q => {
                            if (q.id === questionId) {
                                return {
                                    ...q,
                                    item: text
                                }
                            }
                            return q
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