import { test, unit } from './../types';
import { generateId } from '../helpers';


export default function addUnit(state: test) : test {
    const unit : unit = {
        id: generateId(),
        instructions: '',
        questions: []
    }
    return {
        ...state,
        units: [...state.units, unit]
    }
}