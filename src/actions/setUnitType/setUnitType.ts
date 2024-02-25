import { action, set_unit_action, test, unitType } from '../../types/types';

export default function setUnitType(state: test, action: set_unit_action) : test {
    const newType = action.payload.unitType

    return {
        ...state,
        currentUnit: newType
    }
}