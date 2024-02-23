import { test,  action, question, unit, unitType, actions } from "../types/types";
import deleteQuestion from "./deleteQuestion";

describe('deleteQuestion', () => {
    const state : test = {
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
                        choices: []
                    }
                ]
            }
        ],
        currentUnit: unitType.multipleChoice
    }
    const action : action = {
        type: actions.deleteQuestion,
        payload: {
            unitId: 'unitId',
            questionId: 'q_id'
        }
    }

    it('should add a question slot to the selected unit', () => {
        const result = deleteQuestion(state, action) 
        const questions = result.units[0]!.questions       
        expect(questions).toHaveLength(0)
    });
});

