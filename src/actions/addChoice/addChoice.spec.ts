import { unitType, action, actions, add_choice_action } from "@/types/types";
import addChoice from "./addChoice";

describe('addChoice', () => {
    const state = {
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
    const action : add_choice_action = {
        type: actions.addChoice,
        payload: {
            unitId: 'unitId',
            questionId: 'q_id'
        }
    }

    it('should add a choice in the first question of the first unit', () => {
        const result = addChoice( state , action )
        expect(result.units[0]!.questions![0].choices).toHaveLength(1)
        
    });


    

});