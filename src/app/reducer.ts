import { generateId } from "./helpers";

import type { choice, question, unit, test } from "./types";

export interface payload {
    name?: string;
    subject?: string;
    id?: string;
    instructions?: string;
    question?: string;
    unitId?: string;
    questionId?: string;
}

export interface action {
    type: string;
    payload?: payload
}

export default function (state: test, action: action) : test {
    if (action.type === 'change_name' && action.payload) {
        const value = action.payload.name 
        
        return {
            ...state,
            author : value
        }
    }

    if (action.type === 'change_subject' && action.payload) {
        const value = action.payload.subject;

        return {
            ...state,
            subject: value
        }
    }

    if (action.type === 'add_unit') {
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

    if (action.type === 'change_instructions') {
        const value = action.payload?.instructions as string
        const id = action.payload?.id as string
        const newUnits : unit[] = state.units.map(unit => {
            if (unit.id === id) {
                return {
                    ...unit,
                    instructions: value
                }
            }
            return unit
        })

        return {
            ...state,
            units: newUnits
        }
    }

    if (action.type === 'add_question') {
        const question : question = {
            id: generateId(),
            question: '',
            choices: [
                {id: generateId(), choice: ''},
                {id: generateId(), choice: ''},
                {id: generateId(), choice: ''},
            ]
        }        
        const unitId = action.payload?.id as string
        const newUnits : unit[] = state.units.map(unit => {
            if (unit.id === unitId) {
                return {
                    ...unit,
                    questions: [...unit.questions, question]
                }
            }
            return unit
        })

        return {
            ...state,
            units: newUnits
        }
    }

    if (action.type === 'edit_question') {
        const newQuestion = action.payload?.question as string;
        const unitId = action.payload?.unitId as string;
        const questionId = action.payload?.questionId as string

        const newUnits: unit[] = state.units.map(unit => {
            if (unit.id === unitId) {
                const newQ = unit.questions.map((q) => {
                    if (q.id === questionId) {
                        return {
                            ...q,
                            question: newQuestion
                        }
                    }
                    return q
                })

                return {
                    ...unit,
                    questions: newQ                    
                }
            }

            return unit
        })
        return {
            ...state,
            units: newUnits
        }
    }

    if (action.type === 'delete_question') {
        const questionId = action?.payload?.questionId as string;
        const unitId = action?.payload?.unitId as string;

        const newUnit: unit[] = state.units.map(unit => {
            if (unit.id === unitId) {
                const newQ = unit.questions.filter(q => {
                    return q.id !== questionId
                })
                return {
                    ...unit,
                    questions: newQ
                }
            }

            return unit
        })
        return {
            ...state,
            units: newUnit
        }
    }

    if (action.type === 'add_choice') {
        const newChoice : choice = {
            id: generateId(),
            choice: ''
        }
        
        const unitId = action?.payload?.unitId as string;
        const questionId = action?.payload?.questionId as string;

        const newUnit: unit[] = state.units.map(unit => {
            if (unit.id === unitId) {
                const newQ = unit.questions.map(q => {
                    if (q.id === questionId) {
                        return {
                            ...q,
                            choices: [...q.choices, newChoice]
                        }
                    }

                    return q
                })
                return {
                    ...unit,
                    questions: newQ
                }
            }

            return unit
        })

        return {
            ...state,
            units: newUnit
        }
    }

    // default
    return state
}