import { test,  action, question, unit, unitType, actions, choice, edit_matching_question_action } from "../../types/types";
import editMatchingQuestion from "./editMatchingQuestion";
describe('editMatchingQuestion', () => {
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
    const action : edit_matching_question_action = {
        type: actions.editMatchingQuestion,
        payload: {
            unitId: 'unitId2',
            questionId: 'mq_1',
            text: 'test'
        }
    }
    it('should edit the selected choice', () => {
        const res = editMatchingQuestion(state, action)
        const unit = res.units[0].matchingUnit
        expect(unit!.questions[0].item).toBe('test')
    });
});
