import { change_name_action } from "@/types/actions"
import type { test } from "../../types"

export default function (state: test, action: change_name_action) : test{
    const value = action.payload.name
        
    return {
        ...state,
        author : value
    }
}