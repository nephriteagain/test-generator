import type { choice } from "../types"
import type { action } from '../reducer';
import { Dispatch } from "react";

import Choices from "./Choices"

type QuestionProps = {
    question: string;
    choices: choice[];
    index: number;
    id: string;
    unitId: string;
    dispatch: Dispatch<action>
    
}

export default function Question({question, choices, index, id, unitId, dispatch}: QuestionProps) {
    return (
        <div>                    
            question:
            <input 
                type="text" 
                value={question} 
                name={`q-${id}`}                
                onChange={(e) => dispatch({
                    type: 'edit_question',
                    payload: {
                        unitId,
                        questionId: id,
                        question: e.currentTarget.value
                    }
                })}
            />
            <Choices 
                choices={choices} 
                unitId={unitId}
                questionId={id}
                dispatch={dispatch}
            />
            <button onClick={() => dispatch({
                type: 'delete_question', payload: {questionId: id, unitId}
                })}>
                delete question
            </button>
        </div>
    )
}