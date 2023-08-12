import type { choice, action } from "../types"
import { Dispatch } from "react";

import Choices from "./Choices"
import { test } from "../types";

import { checkScrollHeight } from "../helpers";
import { History } from "../page";

type QuestionProps = {
    question: string;
    choices: choice[];
    index: number;
    id: string;
    unitId: string;
    dispatch: Dispatch<action>
    test: test
}

export default function Question({question, choices, index, id, unitId, dispatch, test}: QuestionProps) {
    return (
        <div className="mx-4 my-2 bg-zinc-200 p-2">                    
            <textarea 
                className="px-2 py-[2px] w-[95%] outline-none resize-none my-2"
                rows={1}
                placeholder="question"
                value={question} 
                name={`q-${id}`}                
                onChange={(e) => {
                    dispatch({
                        type: 'edit_question',
                        payload: {
                            unitId,
                            questionId: id,
                            question: e.currentTarget.value
                        }
                    })
                    checkScrollHeight(e)
                }}
            />
            <Choices 
                choices={choices} 
                unitId={unitId}
                questionId={id}
                dispatch={dispatch}
                test={test}
            />
            <div className="flex">
                <button 
                    className="bg-orange-200 px-2 py-[1px] text-sm ms-auto hover:scale-105 hover:bg-orange-300 active:scale-95 transition-all duration-150 shadow-md drop-shadow-md"
                    onClick={() => {
                        dispatch({
                            type: 'delete_question', payload: {questionId: id, unitId}
                        })
                        History.add(test)
                    }}
                    >
                    delete question
                </button>
            </div>
        </div>
    )
}