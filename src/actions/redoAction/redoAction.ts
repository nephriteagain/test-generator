import type { test, action, redo_action } from "../../types";

export default function redoAction(state: test, action: redo_action) : test {
    if (action.payload?.testData === undefined) {
        return state
    }
    return action.payload.testData
}