import { action, actions, set_unit_action, test, unitType } from '../../types';
import setUnitType from './setUnitType';

describe('setUnitType', () => {
    const state: test = {
        subject: 'Math',
        author: 'Jade',
        units: [],
        currentUnit: unitType.multipleChoice
    }
    const action : set_unit_action  = {
        type: actions.setUnit,
        payload: {
            unitType: unitType.matching
        }
    }
    it('should update the unit type', () => {
        const res = setUnitType(state, action)
        expect(res.currentUnit).toBe(unitType.matching)
    });
});