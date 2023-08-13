import { Dispatch } from 'react';


import type { unit, test, action } from "./types";

import { History } from './page';

import Headers from './components/Headers';
import UndoRedo from './components/UndoRedo';
import Unit from './components/Unit';
import Button from './components/Button';

interface MainProps {
    test: test,
    dispatch: Dispatch<action>
}


export default function Main({test, dispatch}: MainProps) {

    function handleClick() {
        dispatch({type: 'add_unit'})
        History.add(test)
    }

    return (
        <div className="relative bg-gray-100 max-w-[700px] w-[95%] min-h-[500px] px-4 py-2  mb-4 mt-16 shadow-lg" > 
            <UndoRedo dispatch={dispatch}/>
            <Headers test={test} dispatch={dispatch}/>
        <div>
            <Button
                handleClick={handleClick}
                classes='bg-green-400 px-3 py-[2px] rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150'
            >
                add unit
            </Button>
            {test.units.map((unit: unit,index: number) => {
            const {id, questions, instructions} = unit
            return (
                <Unit 
                    key={id}
                    id={id}
                    questions={questions}
                    instructions={instructions}
                    dispatch={dispatch}
                    test={test}
                    index={index}
                    
                />                            
            )
            })}
        </div>
        </div>
  );
}
