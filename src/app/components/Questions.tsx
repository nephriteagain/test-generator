
import type { question, action, test } from "../types"
import { Dispatch } from "react";

import Question from "./Question"
import Button from "./Button";

import { checkScrollHeight } from "../helpers";
import { History } from "../page";

type QuestionsProps = {
    questions: question[];
    instructions: string|undefined;
    index: number;
    id: string;
    dispatch: Dispatch<action>
    test: test;
}

export default function Questions({questions, instructions, index, id, dispatch, test}: QuestionsProps) {
    
    function handleClick(id: string) {
        dispatch({type: 'add_question', payload: {id}})
         History.add(test)
    }
    
    
    const unitId = id;
    return (
        <div className="my-4 bg-slate-200 p-2 shadow-lg">
            
            
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
                                test={test}
                                questionObj={q}
                                />
                        </section>
                    )
                })}
            </section>
            <Button 
                classes="font-semibold bg-green-300 my-2 ms-4 px-2 py-[2px] rounded-md shadow-lg drop-shadow-lg hover:scale-105 hover:bg-green-400 transition-all duration-150"
                handleClick={handleClick}
                args={[id]}
            >
                new question
            </Button>
        </div>
    )
}