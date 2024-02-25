import { set_unit_action } from '@/types/actions';
import { action, test, unitType } from '../../types';

export default function setUnitType(state: test, action: set_unit_action) : test {
    const newType = action.payload.unitType

    return {
        ...state,
        currentUnit: newType
    }
}