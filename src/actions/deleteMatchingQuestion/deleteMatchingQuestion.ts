import type { test, action, unit,} from "../../types/types";

export default function deleteMatchingQuestion(state: test, action: action) : test {
    const unitId = action?.payload?.unitId as string;
    const questionId = action.payload?.questionId as string;

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