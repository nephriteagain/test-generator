import type { test, action, unit, choice, question } from "../types/types";
import { generateId } from "../app/helpers";
import deleteQuestion from "./deleteQuestion";


export default function insertQuestion(state: test, action: action) : test {
    const index = action.payload?.index as number;
    const unitId = action.payload?.unitId as string;
    const questionId = action.payload?.questionId as string;
    const items = action.payload?.json as question;

    const testWithDelete = deleteQuestion(state, action)
    const unitWithInsert = testWithDelete.units.map(unit => {
        if (unit.id === unitId) {
            const newQ = [...unit.questions]
            newQ.splice(index, 0 ,items)
        }

        return unit;
   })

   return {
    ...state,
    units: unitWithInsert
   }
}