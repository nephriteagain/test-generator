import type { test, action, unit, choice } from "../types/types";

export default function editChoice(state: test, action: action) : test {
    const unitId = action?.payload?.unitId as string;
        const questionId = action?.payload?.questionId as string;
        const choiceId = action?.payload?.choiceId as string;
        const value = action?.payload?.text as string;

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