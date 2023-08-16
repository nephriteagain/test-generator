import type { test, action, unit, choice } from "../types/types";

export default function deleteChoice(state: test, action: action) : test {
    const unitId = action?.payload?.unitId as string;
        const questionId = action?.payload?.questionId as string;
        const choiceId = action?.payload?.choiceId as string;

        const newUnit: unit[] = state.units.map(unit => {
            if (unit.id === unitId) {
                // @ts-ignore
                const newQ = unit.questions.map(q => {
                    if (q.id === questionId) {
                        // @ts-ignore
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