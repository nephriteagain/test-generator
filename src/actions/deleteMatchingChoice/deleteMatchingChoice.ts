import type { test, action, unit, delete_matching_choice_action,} from "../../types";

export default function deleteMatchingChoice(state: test, action: delete_matching_choice_action) : test {
    const unitId = action.payload.unitId
    const choiceId = action.payload.choiceId

        const newUnit: unit[] = state.units.map(unit => {
            if (unit.id === unitId && unit.matchingUnit) {
                const { matchingUnit } = unit
                return {
                    ...unit,
                    matchingUnit: {
                        ...matchingUnit,
                        choices: matchingUnit.choices.filter(c => {                            
                            return c.id !== choiceId
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