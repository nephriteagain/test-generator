import { action, test, unit, matching } from '@/types/types';

import { generateId } from '@/utils/helpers';

export default function addMatchingQuestion(state: test, action: action) : test {
    const unitId = action.payload?.unitId as string;
    const newQuestion : matching = {
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
                    questions: [
                        ...matchingUnit.questions,
                        newQuestion
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