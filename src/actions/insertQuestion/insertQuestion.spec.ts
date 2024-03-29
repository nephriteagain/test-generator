import { insert_question_action } from "@/types/actions";
import { test,  action, question, unit, unitType, actions, choice,  } from "../../types";
import insertQuestion from "./insertQuestion";

describe('insertQuestion', () => {
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
                            {id: 'c_1', choice: 'c'},
                            {id: 'c_2', choice: 'c2'},
                            {id: 'c_3', choice: 'c3'},
                        ]
                    },
                    {
                        id: 'q_id2',
                        question: '2 + 2',
                        choices: [
                            {id: 'c_1', choice: 'c'},
                            {id: 'c_2', choice: 'c2'},
                            {id: 'c_3', choice: 'c3'},
                        ]
                    },
                    {
                        id: 'q_id3',
                        question: '3 + 3',
                        choices: [
                            {id: 'c_1', choice: 'c'},
                            {id: 'c_2', choice: 'c2'},
                            {id: 'c_3', choice: 'c3'},
                        ]
                    }
                ]
            }
        ],
        currentUnit: unitType.multipleChoice
    }
    const action : insert_question_action = {
        type: actions.insertQuestion,
        payload: {
            unitId: 'unitId',
            questionId: 'q_id3',
            index: 0,
            json: {
                id: 'q_id3',
                question: '3 + 3',
                choices: [
                    {id: 'c_1', choice: 'c'},
                    {id: 'c_2', choice: 'c2'},
                    {id: 'c_3', choice: 'c3'},
                ]
            }
        }
    }
    it('should insert the last element to the first index', () => {
        const res = insertQuestion(state, action)
        const qs = res.units[0].questions as question[]
        console.log(qs)
        expect(qs[0].id).toBe('q_id3')

    });
    
});