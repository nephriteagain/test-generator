import { edit_matching_choice_action } from "@/types/actions";
import type { test, action, unit, } from "../../types";

export default function editMatchingChoice(state: test, action: edit_matching_choice_action) : test {
    const unitId = action.payload.unitId
    const choiceId = action.payload.choiceId
    const text = action.payload.text

        const newUnit: unit[] = state.units.map(unit => {
            if (unit.id === unitId && unit.matchingUnit) {
                const { matchingUnit } = unit
                return {
                    ...unit,
                    matchingUnit: {
                        ...matchingUnit,
                        choices: matchingUnit.choices.map(c => {
                            if (c.id === choiceId) {
                                return {
                                    ...c,
                                    item: text
                                }
                            }
                            return c
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