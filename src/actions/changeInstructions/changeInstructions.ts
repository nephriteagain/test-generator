import { change_instructions_action } from "@/types/actions";
import type { test, action, unit,  } from "../../types";

export default function changeInstructions(state: test, action: change_instructions_action) : test {
    const value = action.payload.instructions
        const id = action.payload.id
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