import { test,  action, question, unit, unitType, actions } from "../../types/types";
import editQuestion from "./editQuestion";

describe('editQuestion', () => {
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
        type: actions.editQuestion,
        payload: {
            unitId: 'unitId',
            questionId: 'q_id',
            question: 'who are you?'
        }
    }

    it('should add a question slot to the selected unit', () => {
        const result = editQuestion(state, action) 
        const questions = result.units[0]!.questions as question[]
        expect(questions[0].question).toBe('who are you?')
    });
});

