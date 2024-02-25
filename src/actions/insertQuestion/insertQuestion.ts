import { type test, type action, type unit, type choice, type question, type insert_question_action, actions } from "../../types";
import { generateId } from "../../utils/helpers";
import deleteQuestion from "../deleteQuestion/deleteQuestion";


export default function insertQuestion(state: test, action: insert_question_action) : test {
    const index = action.payload?.index as number;
    const unitId = action.payload?.unitId as string;
    const questionId = action.payload?.questionId as string; // for deleteQuestion
    const items = action.payload?.json as question;

    const testWithDelete = deleteQuestion(
        state,
        {
            type: actions.deleteQuestion,
            payload: {
                questionId,
                unitId
            }
        }
    )
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