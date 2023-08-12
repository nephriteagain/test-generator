import { Dispatch } from 'react';


import type { unit, test, action } from "./types";

import { History } from './page';

import Headers from './components/Headers';
import Questions from './components/Questions';

interface MainProps {
    test: test,
    dispatch: Dispatch<action>
}


export default function Main({test, dispatch}: MainProps) {



    return (
        <div
            className="bg-gray-100 max-w-[800px] w-[95%] min-h-[500px] px-4 py-2 m-4 focus-within:border-none"      
        > 
            <Headers test={test} dispatch={dispatch}/>
        <div>
            <button 
                onClick={() => {
                    dispatch({type: 'add_unit'})
                    History.add(test)
                }}
                className='bg-green-400 px-3 py-[2px] rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150'
            >
                add unit
            </button>
            {test.units.map((unit: unit,index: number) => {
            const {id, questions, instructions} = unit
            return (
                <section 
                    key={id}
                    className='mt-4 bg-zinc-200 p-2'
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
                        <button 
                            className='bg-red-300 ms-auto px-2 py-[1px] text-sm rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-red-400 active:scale-95 transition-all duration-150'
                            onClick={() => {dispatch({
                                type: 'delete_unit',
                                payload: {
                                    unitId: id
                                }
                            })
                            History.add(test)
                        }}
                            >
                            delete unit
                        </button>
                    </div>
                </section>

            )
            })}
        </div>
        </div>
  );
}
