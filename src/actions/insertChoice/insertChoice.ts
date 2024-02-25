import { insert_choice_action } from "@/types/actions";
import { type test, type action, type unit, type choice, actions } from "../../types";
import { generateId } from "../../utils/helpers";
import deleteChoice from "../deleteChoice/deleteChoice";

export default function insertChoice(state: test, action: insert_choice_action): test {
    const index = action.payload?.index
    const unitId = action.payload?.unitId;
    const questionId = action?.payload?.questionId;
    const choiceId = action.payload?.choiceId // this is for deleteChoice
    const text = action.payload?.text

    const testWithDelete = deleteChoice(
        state, 
        {
            type: actions.deleteChoice, 
            payload: {
                unitId,
                questionId,
                choiceId
            }
        }
    );
    const unitWithInsert = testWithDelete.units.map((unit) => {
        if (unit.id === unitId && unit.questions) {
            const newQ = unit.questions.map((q) => {
                if (q.id === questionId && q.choices) {
                    const newChoices: choice[] = [...q.choices];
                    const newChoiceId = generateId(); // Generate a new ID for the inserted choice
                    newChoices.splice(index, 0, { id: newChoiceId, choice: text });
                    return {
                        ...q,
                        choices: newChoices.map((c) => {
                            return c.id === newChoiceId ? c : { ...c, id: generateId() };
                        }),
                    };
                }

                return q;
            });
            return {
                ...unit,
                questions: newQ,
            };
        }

        return unit;
    });

    const newUnits = {
        ...testWithDelete,
        units: unitWithInsert,
    };

    return {
        ...newUnits,
        units: unitWithInsert,
    };
}
