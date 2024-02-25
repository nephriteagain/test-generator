import { undo_action } from "@/types/actions";
import { test, action, unitType, actions } from "../../types";
import undoAction from "./undoAction";


describe('undoAction', () => {
    const state: test = {
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
                        choices: [
                            {id: 'c_1', choice: 'c'}
                        ]
                    }
                ]
            }
        ],
        currentUnit: unitType.multipleChoice
    }
    const testData: test = {
        subject: 'Math',
        author: 'Jade',
        units: [],
        currentUnit: unitType.multipleChoice
    }
    const action : undo_action = {
        type: actions.undoAction,
        payload: {
            testData: undefined
        }
    }
    const action2 : undo_action = {
        type: actions.undoAction,
        payload: {
            testData
        }
    }


    it('should render the default state', () => {
        const res = undoAction(state, action)
        expect(res).toBe(state)
    });

    it('should render the  testData', () => {
        const res = undoAction(state, action2)
        expect(res).toBe(testData)
    });
});