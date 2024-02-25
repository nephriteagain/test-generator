import { redo_action } from "@/types/actions";
import type { test, action,  } from "../../types";

export default function redoAction(state: test, action: redo_action) : test {
    if (action.payload?.testData === undefined) {
        return state
    }
    return action.payload.testData
}