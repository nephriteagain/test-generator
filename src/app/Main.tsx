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
  
    useEffect(() => {
        console.log(test)
    }, [test])

    return (
        <div
            className="bg-gray-100 max-w-[600px] min-h-[500px] px-4 py-2 m-4 focus-within:border-none"      
        > 
            <Headers test={test} dispatch={dispatch}/>
        <div>
            <button onClick={() => dispatch({type: 'add_unit'})}>
                add unit
            </button>
            {test.units.map((unit: unit,index: number) => {
            const {id, questions, instructions} = unit
            return (
                <section key={id}>
                    <button onClick={() => dispatch({
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
