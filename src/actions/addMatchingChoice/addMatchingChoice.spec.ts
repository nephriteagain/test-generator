import { unitType, action, actions, test, add_matching_choice_action } from "@/types";
import addMatchingChoice from "./addMatchingChoice";


describe('addMatchingChoice', () => {
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
    const action : add_matching_choice_action = {
        type: actions.addMatchingChoice,
        payload: {
            unitId: 'unitId2',
        }
    }


    it('should add a matching choice', () => {
        const test = addMatchingChoice(state, action)
        expect(test.units[0]!.matchingUnit!.choices).toHaveLength(2)
    });

});