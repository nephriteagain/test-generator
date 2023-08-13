import type {  test, action, choice } from "../types"
import { Dispatch, ChangeEvent, DragEvent, useRef, MouseEvent } from 'react'


import Button from "./Button"

import { History } from "../page"

import { checkScrollHeight, resetOpacityElement } from "../helpers"

interface ChoiceProps {
    id: string;
    choice: string;
    dispatch: Dispatch<action>;
    unitId: string;
    questionId: string;
    test: test;
    index: number;

}

let timeout: any;

export default function Choice({id, choice, dispatch, unitId, questionId, test, index, }: ChoiceProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const dragRef = useRef<HTMLDivElement>(null)

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

    function handleDragStart(e: DragEvent, id: string, questionId:string, unitId:string, index: number) {
        e.stopPropagation()
        console.log(e.target === dragRef.current, 'log')

        const textareaEl = textareaRef.current as HTMLTextAreaElement;                
        const text = textareaEl.value;
        const data = {id, questionId, unitId, index, text}
        e.dataTransfer.setData('text/plain', JSON.stringify(data))        

        const el = e.currentTarget as HTMLDivElement;
        el.style.opacity = '1';
        // dragRef.current = true;
    }


    function handleDrop(e: DragEvent, id:string, questionId: string, unitId: string, index: number) {
        e.stopPropagation();
        e.preventDefault();

        // styling
        // dragRef.current = false;
        // styling
        type json = {id:string; questionId:string; unitId:string; text: string;}
        const data : json = JSON.parse(e.dataTransfer.getData('text/plain'))        

        if (data.id === id || data.questionId !== questionId || data.unitId !== unitId) {
            return;
        } else {
            const {id, questionId, unitId, text} = data
            dispatch({type: 'insert_choice', payload: {
                choiceId: id, questionId, unitId, text, index
            }})
            History.add(test)
        }
    }

    function handleDragEnd(e: DragEvent) {
        e.stopPropagation();
        
        const el = e.currentTarget as HTMLDivElement;
        resetOpacityElement(e, el)
        el.style.opacity = '1'
    }


    function hoverEnter(e: DragEvent) {  
        e.stopPropagation();

        const element = e.currentTarget as HTMLDivElement;
        resetOpacityElement(e, element)

        element.style.opacity = '0.5'
        const texEl = textareaRef.current as HTMLTextAreaElement;
        texEl.style.borderTop = '4px solid black';
    }

    function handleDragLeave(e: DragEvent) {
        e.stopPropagation();
        const element = e.currentTarget as HTMLDivElement;
        element.style.opacity = '1';
        const texEl = textareaRef.current as HTMLTextAreaElement;
        texEl.style.borderTop = '4px solid transparent';
    }


    return (
        <div
            ref={dragRef}
            draggable
            className="flex flex-row items-center justify-center my-2 transition-all duration-100 cursor-pointer"
            onDragStart={(e) => handleDragStart(e, id, questionId, unitId, index)}
            onDrop={(e) => handleDrop(e, id, questionId, unitId, index)}
            // for styling
            onDragEnd={(e) => handleDragEnd(e)}
            onDragEnter={(e) => hoverEnter(e)}
            onDragLeave={(e) => handleDragLeave(e)}            
            data-id={id}
            data-questionid={questionId}
            data-unitid={unitId}
            data-index={index}
        >
            <textarea 
                ref={textareaRef}            
                className={`text-sm px-2 py-[2px] w-[80%] outline-none resize-none me-2 shadow-md border-t-transparent border-t-4 transition-all duration-75 ${false ? 'cursor-grab' : 'cursor-auto'}`}
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