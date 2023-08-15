import type { choice, action, question, focus } from "../types"
import { Dispatch, ChangeEvent, DragEvent, SetStateAction } from "react";

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
    questionObj: question
    focus: focus;
    setFocus: Dispatch<SetStateAction<focus>>
}



export default function Question({question, choices, index, id, unitId, dispatch, test, questionObj, focus, setFocus}: QuestionProps) {
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
    // interface obj {
    //     questionId: string;
    //     unitId: string;
    //     items: question
    // }

    // TODO : fix this
    // function handleDragStart(e: DragEvent, items: question, questionId:string, unitId:string) {
    //     e.stopPropagation();        
    //     const obj : obj = {questionId, unitId, items}
    //     e.dataTransfer.setData('text/plain', JSON.stringify(obj))
    // }

    // function handleDrop(e: DragEvent, questionId:string, unitId:string, index:number) {
    //     e.stopPropagation();
    //     e.preventDefault();
    //     console.log('drop at', e.currentTarget)
    //     const data : obj = JSON.parse(e.dataTransfer.getData('text/plain'));
    //     if (questionId === data.questionId || unitId !== data.unitId) {
    //         return;
    //     }        
    //     const items = data.items;
    //     dispatch({type: 'insert_question', payload: {
    //         index,
    //         unitId,
    //         questionId,
    //         json: items
    //     }})
    // }




    return (
        <div className="mx-4 my-2 bg-zinc-200 p-2 shadow-lg  border-transparent border-4 focus-within:border-cyan-400 transition-all duration-100"
            // draggable
            // onDragStart={(e) => handleDragStart(e, questionObj, id, unitId)}
            // onDrop={(e) => {handleDrop(e, id, unitId, index)}}
            onFocus={() => {
                console.log('question', id)
                setTimeout(() => {
                    setFocus({unit: unitId, question: id})
                })
            }}
        >                    
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