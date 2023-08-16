import { Dispatch, ChangeEvent, SetStateAction } from 'react'
import { useGlobalContext } from '@/context/Context';
import type { test, action, question, focus } from "../../types/types";

import { checkScrollHeight } from '../helpers';

import Questions from './Questions';
import Button from './Button';

type UnitProps = {
    id: string;
    questions: question[];
    instructions: string;
    dispatch: Dispatch<action>;
    test: test;
    index: number;
    focus: focus;
    setFocus: Dispatch<SetStateAction<focus>>
}


export default function Unit ({id, questions, instructions, test, dispatch, index, focus, setFocus}: UnitProps) {
    const { History } = useGlobalContext()


    function handleDeleteUnit(id:string) {
        dispatch({
            type: 'delete_unit',
            payload: {
                unitId: id
            }
        })
        History.add(test)
    }

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>, id:string) {
        dispatch({
            type: 'change_instructions',
            payload: {id,instructions: e.currentTarget.value}
        })  
        checkScrollHeight(e)    
    }

    return (
        <section 
                key={id}
                className='mt-4 bg-zinc-200 p-2 shadow-lg border-4 border-transparent focus-within:border-cyan-600 transition-all duration-100'
                onFocus={() => {
                    console.log(id, 'unit')
                    setFocus({...focus, unit: id})}
                }
        >   
            <textarea 
                className="font-semibold  px-2 py-1 outline-none w-[90%] resize-none shadow-md"                 
                placeholder="instructions"
                rows={1}
                value={instructions}
                name={`unit-${id}`}
                onChange={(e) => handleChange(e, id)}
                    />

            <Questions                 
            questions={questions}
            instructions={instructions}
            index={index}
            id={id}
            dispatch={dispatch}
            test={test}
            focus={focus}
            setFocus={setFocus}
            
            />
            <div className='flex'>
                <Button 
                    classes='bg-red-300 ms-auto px-2 py-[1px] text-sm rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-red-400 active:scale-95 transition-all duration-150'
                    handleClick={handleDeleteUnit}                    
                    args={[id]}
                    >
                    delete unit
                </Button>
            </div>
            </section>
    )
}