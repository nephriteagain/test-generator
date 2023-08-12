
import type { question, action } from "../types"
import { Dispatch } from "react";

import Question from "./Question"

import { checkScrollHeight } from "../helpers";

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
        <div className="my-4 bg-slate-200 p-2">
            <textarea 
                className="px-2 py-1 outline-none w-[90%] resize-none"                
                placeholder="instructions"
                rows={1}
                value={instructions}
                name={`unit-${id}`}
                onChange={(e) => {
                    dispatch({
                        type: 'change_instructions',
                        payload: {id,instructions: e.currentTarget.value}
                    }) 
                    checkScrollHeight(e)                                     
                }}/>
            
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
            <button 
                className="font-semibold bg-green-300 my-2 ms-4 px-2 py-[2px] rounded-md shadow-lg drop-shadow-lg hover:scale-105 hover:bg-green-400 transition-all duration-150"
                onClick={() => dispatch({type: 'add_question', payload: {id}})}

                >
                new question
            </button>
        </div>
    )
}