import { redo_action } from "@/types/actions";
import { test,  action, question, unit, unitType, actions, choice,  } from "../../types";
import redoAction from "./redoAction";

describe('redoAction', () => {
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
    const action : redo_action = {
        type: actions.redoAction,
        payload: {
            testData: undefined
        }
    }
    it('should render the default state', () => {
        const res = redoAction(state, action)
        expect(res).toBe(state)
    });
    it('should render the testData', () => {
        const res = redoAction(state, {...action, payload: {testData}})
        expect(res).toBe(testData)
    });

    

});