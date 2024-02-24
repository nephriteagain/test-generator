import { motion } from "framer-motion";
import  { choice, question, unitType, actions } from "../../types/types"
import { ChangeEvent, DragEvent, } from "react";

import Choices from "./Choices"
import Button from "./Button";

import { checkScrollHeight } from "../helpers";
import { useGlobalContext } from "@/context/Context";
type QuestionProps = {
    question: string;
    choices: choice[]|undefined;
    index: number;
    id: string;
    unitId: string;
    questionObj: question;
    type: unitType;
}



export default function Question({question, choices, index, id, unitId, questionObj, type}: QuestionProps) {
    const { History, dispatch, test, focus, setFocus } = useGlobalContext()

    function handleDeleteQuestion(id: string, unitId: string) {
        dispatch({
            type: actions.deleteQuestion, payload: {questionId: id, unitId}
        })
        History.add(test)
    }

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>, unitId: string, id: string,) {
        dispatch({
            type: actions.editQuestion,
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
        <motion.div 
            layout
            transition={{layout: {duration:0.2, ease: 'linear'}}}
            className="mx-4 my-2 bg-zinc-200 dark:bg-zinc-800 p-2 shadow-lg  border-transparent border-4 focus-within:border-cyan-400 transition-all duration-200 animate-in slide-in-from-left"
            // draggable
            // onDragStart={(e) => handleDragStart(e, questionObj, id, unitId)}
            // onDrop={(e) => {handleDrop(e, id, unitId, index)}}
            onFocus={() => {
                setTimeout(() => {
                    setFocus({unit: unitId, question: id, type})                    
                })
            }}
            data-testid="question"
        >       
            <textarea 
                className="dark:bg-black px-2 py-[2px] w-[90%] outline-none resize-none my-2 shadow-md"
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
                type={type}
            />
            <div className="flex">
                <Button 
                    className="bg-orange-200 dark:bg-orange-700  px-2 py-[1px] text-sm ms-auto hover:scale-105 hover:bg-orange-300 active:scale-95 transition-all duration-150 shadow-md drop-shadow-md"
                    handleClick={handleDeleteQuestion}
                    args={[id, unitId]}
                    data-testid="delete-question"
                    >
                    delete question
                </Button>
            </div>
        </motion.div>
    )
}