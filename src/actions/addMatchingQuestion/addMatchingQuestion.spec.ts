import { unitType, action, actions, test } from "@/types/types";
import addMatchingQuestion from "./addMatchingQuestion";


describe('addMatchingQuestion', () => {
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
    const action : action = {
        type: actions.addMatchingQuestion,
        payload: {
            unitId: 'unitId2',
        }
    }


    it('should add a matching choice', () => {
        const test = addMatchingQuestion(state, action)
        expect(test.units[0]!.matchingUnit!.questions).toHaveLength(2)
    });

});