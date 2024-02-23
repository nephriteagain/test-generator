import { test,  action, question, unit, unitType, actions, choice } from "../types/types";
import insertChoice from "./insertChoice";

describe('insertChoice', () => {
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
                            {id: 'c_1', choice: 'c'},
                            {id: 'c_2', choice: 'c2'},
                            {id: 'c_3', choice: 'c3'},
                        ]
                    }
                ]
            }
        ],
        currentUnit: unitType.multipleChoice
    }
    const action : action = {
        type: actions.insertChoice,
        payload: {
            unitId: 'unitId',
            questionId: 'q_id',
            choiceId: 'c_3',
            index: 0,
            text: 'c3'
        }
    }
    it('should insert the last element to the first index', () => {
        const res = insertChoice(state, action)
        const qs = res.units[0].questions as question[];
        const choices = qs[0].choices as choice[]
        console.log(choices)
        expect(choices[0].choice).toBe('c3')

    });
    
});