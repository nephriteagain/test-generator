import type {  test, action } from "../types"
import { Dispatch, ChangeEvent, DragEvent, RefObject} from 'react'

import Button from "./Button"

import { History } from "../page"

import { checkScrollHeight, isHTMLElement } from "../helpers"

interface ChoiceProps {
    id: string;
    choice: string;
    dispatch: Dispatch<action>;
    unitId: string;
    questionId: string;
    test: test;
}

export default function Choice({id, choice, dispatch, unitId, questionId, test,}: ChoiceProps) {


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

    function handleDragStart(e: DragEvent, id: string) {
        e.stopPropagation()
        const data = id
        console.log(data)
        e.dataTransfer.setData('text/plain', data)
    }

    function handleDragEnd(e: DragEvent) {
        const element = e.currentTarget as HTMLDivElement;
        element.style.opacity = '1'
    }

    function handleDrop(e: DragEvent, id:string) {
        e.stopPropagation()
        const el = e.currentTarget as HTMLDivElement;
        el.style.opacity = '1'
        console.log(id, 'id')
        const data = e.dataTransfer.getData('text/plain')
        console.log(data)
    }

    function hoverEnter(e: DragEvent) {
        e.stopPropagation();
        e.preventDefault();    

        const element = e.currentTarget as HTMLDivElement;
        const parent = element.parentElement as HTMLTableSectionElement;
        // typescript wtf?? .... i am forced to write this?
        parent.childNodes.forEach((child) => {
            if (isHTMLElement(child)) {
                child.style.opacity = '1'
            }
        })

        element.style.opacity = '0.4'
    }

    function handleDragLeave(e: DragEvent) {
        const element = e.currentTarget as HTMLDivElement;
        element.style.opacity = '1'
    }

    return (
        <div
            className="flex flex-row items-center justify-center my-1"
            draggable                        
            // onDragStart={(e) => handleDragEnd(e,id)}
            // onDragOver={(e) => handleDragOver(e,id)}
            onDragStart={(e) => handleDragStart(e, id)}
            // onDragEnd={(e) => handleDragEnd(e)}
            onDrop={(e) => handleDrop(e, id)}
            onDragEnter={(e) => hoverEnter(e)}
            onDragLeave={(e) => handleDragLeave}
            data-id={id}
        >
            <textarea 
                className="text-sm px-2 py-[1px] w-[80%] outline-none resize-none me-2 shadow-md cursor-grab"
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