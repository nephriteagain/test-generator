import { action, test, currentUnit } from './../types';

export default function setUnitType(state: test, action: action) : test {
    const newType = action.payload?.unitType as currentUnit;

    return {
        ...state,
        currentUnit: newType
    }
}