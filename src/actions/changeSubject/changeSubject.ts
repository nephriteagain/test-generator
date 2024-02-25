import { change_subject_action } from "@/types/actions"
import type { test,  } from "../../types"

export default function changeSubject(state: test, action: change_subject_action) : test {
    const value = action.payload.subject

    return {
        ...state,
        subject: value
    }
}