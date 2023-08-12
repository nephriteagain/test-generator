import { useReducer, useEffect } from 'react';
import reducer from './reducer'

import type { choice, question, unit, test } from "./types";

import Headers from './components/Headers';
import Questions from './components/Questions';

const initial : test = {
    subject : '',
    author : '',
    units: []
}


export default function Main() {
    const [ test, dispatch ] = useReducer(reducer,initial)
    
// remove before production
    // useEffect(() => {
    //     console.log(test)
    // }, [test])
// remove before production


    return (
        <div
            className="bg-gray-100 max-w-[600px] min-h-[500px] px-4 py-2 m-4 focus-within:border-none"      
        > 
            <Headers test={test} dispatch={dispatch}/>
        <div>
            <button 
                onClick={() => dispatch({type: 'add_unit'})}
                className='bg-green-400 px-3 py-[2px] rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150'
            >
                add unit
            </button>
            {test.units.map((unit: unit,index: number) => {
            const {id, questions, instructions} = unit
            return (
                <section 
                    key={id}
                    className='mt-4'
                >
                    <button 
                        className='bg-red-300 px-2 py-[1px] text-sm rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-red-400 active:scale-95 transition-all duration-150'
                        onClick={() => dispatch({
                            type: 'delete_unit',
                            payload: {
                                unitId: id
                            }
                        })}>
                        delete unit
                    </button>
                    <Questions                 
                    questions={questions}
                    instructions={instructions}
                    index={index}
                    id={id}
                    dispatch={dispatch}
                    />
                </section>

            )
            })}
        </div>
        </div>
  );
}
