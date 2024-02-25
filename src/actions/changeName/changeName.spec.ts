import { test,  action, question, unit, unitType, actions, change_name_action } from "../../types";
import changeName from "./changeName";

describe('changeName', () => {
    const test : test = {
        subject: 'Math',
        author: 'Jade',
        currentUnit: unitType.multipleChoice,
        units: [
            {
                type: unitType.multipleChoice,
                id: '1',
                instructions: '',
                questions: []
            }
        ]
    }
    const action : change_name_action = {
        type: actions.changeName,
        payload: {
            name: 'Kidney'
        } 
    }
    it('should change the author to "Kidney"', () => {
        const res = changeName(test, action)
        expect(res.author).toBe('Kidney')
    });
});