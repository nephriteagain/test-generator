import { test } from "@/types"

export default function checkLocalStorage(state: test) : test {
    const savedData = localStorage.getItem('current_test')

    if (typeof savedData === 'string') {
        const savedTest = JSON.parse(savedData) as test
        return savedTest
    }
    return state
}