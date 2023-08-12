import { test, action } from "../types";

export default function deleteUnit(state:test, action: action) : test {
    const unitId = action.payload?.unitId
    const newUnit = state.units.filter(unit => {
        return unit.id !== unitId
    })
    return {
        ...state,
        units: newUnit
    }
}