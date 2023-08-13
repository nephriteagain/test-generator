import type {  test, action } from "../types"
import { Dispatch, ChangeEvent, DragEvent, useRef, useState,} from 'react'

import Button from "./Button"

import { History } from "../page"

import { checkScrollHeight } from "../helpers"

interface ChoiceProps {
    id: string;
    choice: string;
    dispatch: Dispatch<action>;
    unitId: string;
    questionId: string;
    test: test;
}

export default function Choice({id, choice, dispatch, unitId, questionId, test}: ChoiceProps) {
    const dragOverRef = useRef<string|null>(null)
    const dragRef = useRef<string|null>(null)

    const [ drag, setDrag ] = useState('')
    const [ over, setOver ] = useState('')

    function handleDeleteChoice(id: string, unitId: string, questionId: string) {
        dispatch({
            type: 'delete_choice',
            payload: {
                unitId,
                questionId,
                choiceId: id
            }
        })
        History.add(test)
    }
    

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>, id: string) {
        dispatch({
            type: 'edit_choice',
            payload: {
                unitId,
                questionId,
                choiceId: id,
                text: e.currentTarget.value
            }
        })
        checkScrollHeight(e)
    }

    function handleDragStart(e: DragEvent) {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-id') as string
        console.log(id)
        e.dataTransfer.setData('text/plain', id)
    }

    function handleDrop(e: DragEvent) {
        e.stopPropagation()
        const data = e.dataTransfer.getData('text/plain')
        console.log(data)
    }


    return (
        <div
            className="flex flex-row items-center justify-center"
            draggable                        
            // onDragStart={(e) => handleDragEnd(e,id)}
            // onDragOver={(e) => handleDragOver(e,id)}
            onDragStart={(e) => handleDragStart(e)}
            onDrop={(e) => handleDrop(e)}
            data-id={id}
        >
            <textarea 
                className="text-sm px-2 py-[1px] w-[80%] outline-none resize-none my-1 me-2 shadow-md cursor-grab"
                rows={1}
                value={choice}
                onChange={(e) => handleChange(e, id)}
            />
            <Button
                classes="bg-red-300 px-2 py-[1px] text-sm rounded-full hover:bg-red-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 shadow-md drop-shadow-md"
                handleClick={handleDeleteChoice}
                args={[id, unitId, questionId]}
            >
                X
            </Button>
        </div>

    )
}