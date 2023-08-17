import type { test, action, unit } from "../types/types";

export default function deleteQuestion(state: test, action: action) : test {
    const questionId = action?.payload?.questionId as string;
        const unitId = action?.payload?.unitId as string;

        const newUnit: unit[] = state.units.map(unit => {
            if (unit.id === unitId) {
                // @ts-ignore
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
