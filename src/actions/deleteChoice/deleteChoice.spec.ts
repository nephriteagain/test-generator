import { delete_choice_action } from "@/types/actions";
import { test,  action, question, unit, unitType, actions, choice } from "../../types";
import deleteChoice from "./deleteChoice";


describe('deleteChoice', () => {
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
    const action : delete_choice_action = {
        type: actions.deleteChoice,
        payload: {
            unitId: 'unitId',
            questionId: 'q_id',
            choiceId: 'c_1'
        }
    }

    it('should deleted the selected choice', () => {
        const res = deleteChoice(state, action)
        const qs = res.units[0]!.questions as question[]
        const choices = qs[0].choices
        
        expect(choices).toHaveLength(0)
    });

});
