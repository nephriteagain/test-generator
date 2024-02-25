import { test,  action, question, unit, unitType, actions } from "../../types/types";
import checkLocalStorage from "./checkLocalStorage";

describe('checkLocalStorage', () => {
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
    it('should return to parsed state from localstorage', () => {
        jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem').mockReturnValueOnce(JSON.stringify(test))
        const json = jest.spyOn(JSON, 'parse')
        checkLocalStorage(test)
        expect(json).toHaveBeenCalledWith(JSON.stringify(test))        
    });

    it('should return the same test', () => {
        const res = checkLocalStorage(test)
        expect(res).toBe(test)
    });


    

});