import type { question, action } from "../types"
import { Dispatch } from "react";

import Question from "./Question"

type QuestionsProps = {
    questions: question[];
    instructions: string|undefined;
    index: number;
    id: string;
    dispatch: Dispatch<action>
}

export default function Questions({questions, instructions, index, id, dispatch}: QuestionsProps) {
    const unitId = id;
    return (
        <div>
            <label className="block" htmlFor={`unit-${id}`}>
                instructions
            </label>
            <input 
                type="text" 
                value={instructions} 
                name={`unit-${id}`}
                onChange={(e) => dispatch({
                    type: 'change_instructions',
                    payload: {
                        id,                        
                        instructions: e.currentTarget.value
                    }
                })}/>
            
            <section>
                {questions.map((q: question, index: number) => {
                    const { id , question, choices} = q
                    return (
                        <section key={id}>
                            <Question                             
                                question={question}
                                choices={choices}
                                index={index}
                                id={id}
                                unitId={unitId}
                                dispatch={dispatch}
                                />
                        </section>
                    )
                })}
            </section>
            <button onClick={() => dispatch({type: 'add_question', payload: {id}})}>
                add a question
            </button>
        </div>
    )
}