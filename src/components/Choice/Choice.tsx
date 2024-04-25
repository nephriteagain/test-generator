import { motion } from 'framer-motion'
import {ChangeEvent, DragEvent, useRef} from 'react'
import { IoClose } from "react-icons/io5";



import Button from "../Button/Button"

import { useGlobalContext } from "@/context/Context"

import { checkScrollHeight, resetOpacityElement } from "../../utils/helpers"
import { actions } from '@/types'

interface ChoiceProps {
    id: string;
    choice: string;
    unitId: string;
    questionId: string;
    index: number;
}


export default function Choice({id, choice, unitId, questionId, index, }: ChoiceProps) {
    const { History, dispatch, test } = useGlobalContext()

    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const dragRef = useRef<HTMLDivElement>(null)

    function handleDeleteChoice(id: string, unitId: string, questionId: string) {
        dispatch({
            type: actions.deleteChoice,
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
            type: actions.editChoice,
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

        const textareaEl = textareaRef.current as HTMLTextAreaElement;                
        const text = textareaEl.value;
        const data = {id, questionId, unitId, index, text}
        e.dataTransfer.setData('text/plain', JSON.stringify(data))        

        const el = e.currentTarget as HTMLDivElement;
        el.style.opacity = '1';
    }


    function handleDrop(e: DragEvent, id:string, questionId: string, unitId: string, index: number) {
        e.stopPropagation();
        e.preventDefault();

        type json = {id:string; questionId:string; unitId:string; text: string;}
        const data : json = JSON.parse(e.dataTransfer.getData('text/plain'))        

        if (data.id === id || data.questionId !== questionId || data.unitId !== unitId) {
            return;
        } else {
            const {id, questionId, unitId, text} = data
            dispatch({type: actions.insertChoice, payload: {
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
        const texEl = textareaRef.current as HTMLTextAreaElement;
        texEl.style.borderTop = '4px solid transparent';
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
            className="flex flex-row items-center justify-center my-2 transition-all duration-200 cursor-pointer relative animate-in slide-in-from-top"
            ref={dragRef}
            draggable
            onDragStart={(e) => handleDragStart(e, id, questionId, unitId, index)}
            onDrop={(e) => handleDrop(e, id, questionId, unitId, index)}
            // for styling
            onDragEnd={handleDragEnd}
            onDragEnter={hoverEnter}
            onDragLeave={handleDragLeave}  
            data-id={id}
            data-questionid={questionId}
            data-unitid={unitId}
            data-index={index}
            data-testid={'choice'}
        >
            <textarea 
                ref={textareaRef}            
                className={`bg-transparent text-sm px-2 py-[2px] w-[80%] outline-none resize-none me-2 border border-gray-300 dark:border-gray-700  transition-all duration-75 ${false ? 'cursor-grab' : 'cursor-auto'}`}
                rows={1}
                value={choice}
                onChange={(e) => handleChange(e, id)}
                data-testid="choice-textarea"
            />
            <Button
                className="border-2 border-red-400 dark:border-red-600 px-1 py-[1px] text-base aspect-square rounded-full text-red-400 dark:text-red-700 hover:bg-red-200 dark:hover:bg-red-950 dark:hover:text-red-700 hover:scale-105 active:scale-95 transition-all duration-150"
                onClick={() => handleDeleteChoice(id, unitId, questionId)}
                data-testid="delete-choice"
            >
                <IoClose />
            </Button>
        </div>

    )
}