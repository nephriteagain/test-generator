import type { test, action, unit } from "../../types/types";

export default function changeInstructions(state: test, action: action) : test {
    const value = action.payload?.instructions as string
        const id = action.payload?.id as string
        const newUnits : unit[] = state.units.map(unit => {
            if (unit.id === id) {
                return {
                    ...unit,
                    instructions: value
                }
            }
            return unit
        })

        return {
            ...state,
            units: newUnits
        }
}