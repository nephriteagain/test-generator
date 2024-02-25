import { change_subject_action } from "@/types/actions";
import { test,  action, question, unit, unitType, actions,  } from "../../types";
import changeSubject from "./changeSubject";

describe('changeSubject', () => {
    const test : test = {
        subject: 'Math',
        author: 'Jade',
        currentUnit: unitType.multipleChoice,
        units: [
            {
                type: unitType.multipleChoice,
                id: '1',
                instructions: '',
                questions: []
            }
        ]
    }
    const action : change_subject_action = {
        type: actions.changeSubject,
        payload: {
            subject: 'English'
        }
    }
    it('should change the subject to "English"', () => {
        const res = changeSubject(test, action)
        expect(res.subject).toBe('English')
    });
});