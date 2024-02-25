import { edit_choice_action } from "@/types/actions";
import { test,  action, question, unit, unitType, actions, choice } from "../../types";
import editChoice from "./editChoice";


describe('editChoice', () => {
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
    const action : edit_choice_action = {
        type: actions.editChoice,
        payload: {
            unitId: 'unitId',
            questionId: 'q_id',
            choiceId: 'c_1',
            text: 'cat'
        }
    }

    it('should change the selected choice text from "c" to "cat"', () => {
        const res = editChoice(state, action)
        const qs = res.units[0].questions as question[]
        const choices = qs[0].choices as choice[]
        expect(choices[0].choice).toBe('cat')
    });
});