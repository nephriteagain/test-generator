import { action, test, unit, matching } from '@/types/types';

import { generateId } from '@/app/helpers';

export default function addMatchingChoice(state: test, action: action) : test {
    const unitId = action.payload?.unitId as string;
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