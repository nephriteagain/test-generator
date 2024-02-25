import { test,  action, question, unit, unitType, actions, change_instructions_action } from "../../types/types";
import changeInstructions from "./changeInstructions";

describe('changeInstructions', () => {
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
    const action : change_instructions_action = {
        type: actions.changeInstructions,
        payload: {
            id: '1',
            instructions: 'new instructions'
        }
    }
    it('updates the selected unit\'s instructions', () => {
        const result = changeInstructions(test, action)
        expect(result.units[0].instructions).toBe('new instructions')
    })


});