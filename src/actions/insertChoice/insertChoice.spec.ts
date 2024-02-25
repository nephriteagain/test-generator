import { test,  action, question, unit, unitType, actions, choice, insert_choice_action } from "../../types";
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
    const action : insert_choice_action = {
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
        expect(choices[0].choice).toBe('c3')

    });
    
});