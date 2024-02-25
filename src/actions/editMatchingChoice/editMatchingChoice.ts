import type { test, action, unit,} from "../../types/types";

export default function editMatchingChoice(state: test, action: action) : test {
    const unitId = action?.payload?.unitId as string;
    const choiceId = action.payload?.choiceId as string;
    const text = action.payload?.text as string;

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