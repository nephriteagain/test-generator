import { action, test, unit, matching, add_matching_question_action } from '@/types';

import { generateId } from '@/utils/helpers';

export default function addMatchingQuestion(state: test, action: add_matching_question_action) : test {
    const unitId = action.payload.unitId 
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