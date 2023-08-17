import type { test, action, unit,} from "../types/types";

export default function deleteMatchingChoice(state: test, action: action) : test {
    const unitId = action?.payload?.unitId as string;
    const choiceId = action.payload?.choiceId as string;

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