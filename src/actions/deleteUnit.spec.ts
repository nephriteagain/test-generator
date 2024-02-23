import { test,  action, question, unit, unitType, actions } from "../types/types";
import deleteUnit from "./deleteUnit";

describe('deleteUnit', () => {
    const state : test = {
        subject: 'Math',
        author: 'Jade',
        units: [
            {
                type: unitType.multipleChoice,
                id: 'unitId',
                instructions: 'solve',
                questions: [
                    {
                        id: 'q_id',
                        question: '1 + 1',
                        choices: []
                    }
                ]
            }
        ],
        currentUnit: unitType.multipleChoice
    }
    const action : action = {
        type: actions.deleteUnit,
        payload: {
            unitId: 'unitId',
        }
    }
    it('should remove the selected unit', () => {
        const res = deleteUnit(state, action)
        expect(res.units).toHaveLength(0)
    });
});