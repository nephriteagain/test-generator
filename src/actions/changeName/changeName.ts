import type { test, change_name_action } from "../../types/types"

export default function (state: test, action: change_name_action) : test{
    const value = action.payload.name
        
    return {
        ...state,
        author : value
    }
}