import type { test, action, unit, choice, question } from "../../types/types";
import { generateId } from "../../utils/helpers";
import deleteQuestion from "../deleteQuestion/deleteQuestion";


export default function insertQuestion(state: test, action: action) : test {
    const index = action.payload?.index as number;
    const unitId = action.payload?.unitId as string;
    const questionId = action.payload?.questionId as string; // for deleteQuestion
    const items = action.payload?.json as question;

    const testWithDelete = deleteQuestion(state, action)
    const unitWithInsert = testWithDelete.units.map(unit => {
        if (unit.id === unitId && unit.questions) {
            const newQ = [...unit.questions]
            newQ.splice(index, 0 ,items)
            return {
                ...unit,
                questions: newQ
            }
        }

        return unit;
   })

   return {
    ...state,
    units: unitWithInsert
   }
}