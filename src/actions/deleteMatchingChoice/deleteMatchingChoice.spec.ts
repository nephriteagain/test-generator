import { test,  action, question, unit, unitType, actions, choice, matchingUnit } from "../../types/types";
import deleteMatchingChoice from "../deleteMatchingChoice";


describe('deleteMatchingChoice', () => {
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
        type: actions.deleteMatchingChoice,
        payload: {
            unitId: 'unitId2',
            choiceId: 'mc_1'
        }
    }

    it('should delete the selected choice', () => {
        const res = deleteMatchingChoice(state, action)
        const matching = res.units[0].matchingUnit as matchingUnit
        const choices = matching.choices
        expect(choices).toHaveLength(0)
    });
});
