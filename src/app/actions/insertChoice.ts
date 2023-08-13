import type { test, action, unit, choice } from "../types";
import deleteChoice from "./deleteChoice";
import { generateId } from "../helpers";

export default function insertChoice(state: test, action: action): test {
    const index = action.payload?.index as number;
    const unitId = action.payload?.unitId;
    const questionId = action?.payload?.questionId;
    const text = action.payload?.text as string;

    const testWithDelete = deleteChoice(state, action);
    const unitWithInsert = testWithDelete.units.map((unit) => {
        if (unit.id === unitId) {
            const newQ = unit.questions.map((q) => {
                if (q.id === questionId) {
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
