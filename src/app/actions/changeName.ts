import type { test, action } from "../types"

export default function (state: test, action: action) : test{
    const value = action?.payload?.name as string
        
    return {
        ...state,
        author : value
    }
}