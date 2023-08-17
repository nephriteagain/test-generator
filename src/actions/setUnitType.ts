import { action, test, unitType } from '../types/types';

export default function setUnitType(state: test, action: action) : test {
    const newType = action.payload?.unitType as unitType;

    return {
        ...state,
        currentUnit: newType
    }
}