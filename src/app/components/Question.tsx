import type { choice, action } from "../types"
import { Dispatch, ChangeEvent } from "react";

import Choices from "./Choices"
import Button from "./Button";
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
    function handleDeleteQuestion(id: string, unitId: string) {
        dispatch({
            type: 'delete_question', payload: {questionId: id, unitId}
        })
        History.add(test)
    }

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>, unitId: string, id: string) {
        dispatch({
            type: 'edit_question',
            payload: {
                unitId,
                questionId: id,
                question: e.currentTarget.value
            }
        })
        checkScrollHeight(e)
    }

    return (
        <div className="mx-4 my-2 bg-zinc-200 p-2 shadow-lg">                    
            <textarea 
                className="px-2 py-[2px] w-[95%] outline-none resize-none my-2 shadow-md"
                rows={1}
                placeholder="question"
                value={question} 
                name={`q-${id}`}                
                onChange={(e) => handleChange(e, unitId, id)}
            />
            <Choices 
                choices={choices} 
                unitId={unitId}
                questionId={id}
                dispatch={dispatch}
                test={test}
            />
            <div className="flex">
                <Button 
                    classes="bg-orange-200 px-2 py-[1px] text-sm ms-auto hover:scale-105 hover:bg-orange-300 active:scale-95 transition-all duration-150 shadow-md drop-shadow-md"
                    handleClick={handleDeleteQuestion}
                    args={[id, unitId]}
                    >
                    delete question
                </Button>
            </div>
        </div>
    )
}