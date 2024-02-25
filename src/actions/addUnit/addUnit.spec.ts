import { test,  action, question, unit, unitType, actions } from "../../types";
import addUnit from "./addUnit";


describe('addUnit', () => {
    const state : Omit<test,'currentUnit'> = {
        subject: 'Math',
        author: 'Jade',
        units: []
    }

    it('should add a new multiple choice unit', () => {
        const multi : test = {
            ...state,
            currentUnit: unitType.multipleChoice
        }
        const result = addUnit(multi)
        expect(result.units).toHaveLength(1)
        expect(result.units[0].type).toBe(unitType.multipleChoice)
    });

    it('should add a new shortAnswer unit', () => {
        const multi : test = {
            ...state,
            currentUnit: unitType.shortAnswer
        }
        const result = addUnit(multi)
        expect(result.units).toHaveLength(1)
        expect(result.units[0].type).toBe(unitType.shortAnswer)
    });

    it('should add a new matching unit', () => {
        const multi : test = {
            ...state,
            currentUnit: unitType.matching
        }
        const result = addUnit(multi)
        expect(result.units).toHaveLength(1)
        expect(result.units[0].type).toBe(unitType.matching)
    });

    it('should add a new essay unit', () => {
        const multi : test = {
            ...state,
            currentUnit: unitType.essay
        }
        const result = addUnit(multi)
        expect(result.units).toHaveLength(1)
        expect(result.units[0].type).toBe(unitType.essay)
    });

});