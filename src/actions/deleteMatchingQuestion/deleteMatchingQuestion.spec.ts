import { test,  action, question, unit, unitType, actions, choice, matchingUnit, delete_matching_question_action } from "../../types/types";
import deleteMatchingQuestion from "./deleteMatchingQuestion";


describe('deleteMatchingQuestion', () => {
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
    const action : delete_matching_question_action = {
        type: actions.deleteMatchingQuestion,
        payload: {
            unitId: 'unitId2',
            questionId: 'mq_1'
        }
    }

    it('should delete the selected choice', () => {
        const res = deleteMatchingQuestion(state, action)
        const matching = res.units[0].matchingUnit as matchingUnit
        const qs = matching.questions
        expect(qs).toHaveLength(0)
    });
});
