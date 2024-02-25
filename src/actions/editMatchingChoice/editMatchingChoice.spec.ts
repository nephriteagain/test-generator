import { edit_matching_choice_action } from "@/types/actions";
import { test,  action, question, unit, unitType, actions, choice,  } from "../../types";
import editMatchingChoice from "./editMatchingChoice";

describe('editMatchingChoice', () => {
    const state : test = {
        subject: 'Math',
        author: 'Jade',
        units: [          
            {
                type: unitType.matching,
                id: 'unitId2',
                instructions: 'answer',
                matchingUnit: {
                    id: 'matching_id',
                    questions: [
                        {item: 'a', id: 'mq_1'}
                    ],
                    choices: [
                        {item: 'a', id: 'mc_1'}
                    ]
                }
                
            }
        ],
        currentUnit: unitType.multipleChoice
    }
    const action : edit_matching_choice_action = {
        type: actions.editMatchingChoice,
        payload: {
            unitId: 'unitId2',
            choiceId: 'mc_1',
            text: 'test'
        }
    }
    it('should edit the selected choice', () => {
        const res = editMatchingChoice(state, action)
        const unit = res.units[0].matchingUnit
        expect(unit!.choices[0].item).toBe('test')
    });
});
