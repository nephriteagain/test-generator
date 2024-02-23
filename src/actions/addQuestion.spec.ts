import { test,  action, question, unit, unitType, actions } from "../types/types";
import addQuestion from "./addQuestion";

describe('addQuestion', () => {
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
        type: actions.addQuestion,
        payload: {
            id: 'unitId',
        }
    }

    it('should add a question slot to the selected unit', () => {
        const result = addQuestion(state, action) 
        const questions = result.units[0]!.questions       
        expect(questions).toHaveLength(2)
    });
});

