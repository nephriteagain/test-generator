import { delete_unit_action } from "@/types/actions";
import { test, action  } from "../../types";

export default function deleteUnit(state:test, action: delete_unit_action) : test {
    const unitId = action.payload.unitId
    const newUnit = state.units.filter(unit => {
        return unit.id !== unitId
    })
    return {
        ...state,
        units: newUnit
    }
}