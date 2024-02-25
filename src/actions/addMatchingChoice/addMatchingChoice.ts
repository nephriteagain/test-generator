import { action, test, unit, matching, add_matching_choice_action } from '@/types';

import { generateId } from '@/utils/helpers';

export default function addMatchingChoice(state: test, action: add_matching_choice_action) : test {
    const unitId = action.payload.unitId
    const newChoice : matching = {
        item: '',
        id: generateId()
    }

    const newUnit: unit[] = state.units.map(unit => {
        if (unit.id === unitId && unit.matchingUnit) {
            const { matchingUnit } = unit
            return {
                ...unit,
                matchingUnit: {
                    ...matchingUnit,
                    choices: [
                        ...matchingUnit.choices,
                        newChoice
                    ]
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