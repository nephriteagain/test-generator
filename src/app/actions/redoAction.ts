import type { test, action } from "../types";

export default function redoAction(state: test, action: action) : test {
    if (action.payload?.testData === undefined) {
        return state
    }
    return action.payload.testData
}