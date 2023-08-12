import { Dispatch } from 'react'
import { History } from "../page"

import type { test, action, question } from "../types";

import Questions from './Questions';
import Button from './Button';

type UnitProps = {
    id: string;
    questions: question[];
    instructions: string;
    dispatch: Dispatch<action>;
    test: test;
    index: number;
}


export default function Unit ({id, questions, instructions, test, dispatch, index}: UnitProps) {

    function handleClick(id:string) {
        dispatch({
            type: 'delete_unit',
            payload: {
                unitId: id
            }
        })
        History.add(test)
    }

    return (
        <section 
                key={id}
                className='font-semibold mt-4 bg-zinc-200 p-2 shadow-lg'
            >                   
                <Questions                 
                questions={questions}
                instructions={instructions}
                index={index}
                id={id}
                dispatch={dispatch}
                test={test}
                />
                <div className='flex'>
                    <Button 
                        classes='bg-red-300 ms-auto px-2 py-[1px] text-sm rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-red-400 active:scale-95 transition-all duration-150'
                        handleClick={handleClick}                    
                        args={[id]}
                        >
                        delete unit
                    </Button>
                </div>
            </section>
    )
}