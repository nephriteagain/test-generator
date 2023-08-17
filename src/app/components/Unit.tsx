import { ChangeEvent } from 'react'
import { useGlobalContext } from '@/context/Context';
import  { question, unitType, matchingUnit, actions } from "../../types/types";

import { checkScrollHeight } from '../helpers';

import Questions from './Questions';
import Button from './Button';

type UnitProps = {
    id: string;
    questions: question[]|undefined;
    instructions: string;
    index: number;
    type: unitType;
    matchingUnit: matchingUnit|undefined;
}


export default function Unit ({id, questions, instructions,index, type, matchingUnit}: UnitProps) {
    const { History, dispatch, focus, setFocus, test } = useGlobalContext()


    function handleDeleteUnit(id:string) {
        dispatch({
            type: actions.deleteUnit,
            payload: {
                unitId: id
            }
        })
        History.add(test)
    }

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>, id:string) {
        dispatch({
            type: actions.changeInstructions,
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
                    setFocus({...focus, unit: id, type})}
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
                index={index}
                id={id}       
                type={type}     
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