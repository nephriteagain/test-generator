import type { test, action } from "../../types/types"

export default function changeSubject(state: test, action: action) : test {
    const value = action?.payload?.subject as string;

    return {
        ...state,
        subject: value
    }
}