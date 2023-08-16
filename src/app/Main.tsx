import type { unit,} from "../types/types";

import { useGlobalContext } from '@/context/Context';


import Headers from './components/Headers';
import UndoRedo from './components/UndoRedo';
import Unit from './components/Unit';
import Button from './components/Button';
import MatchingQuestions from "./components/MatchingQuestions";

export default function Main() {
    
    const { History, test, dispatch } = useGlobalContext()

    function handleClick() {
        dispatch({type: 'add_unit'})
        History.add(test)
    }

    return (        
        <div className="relative bg-gray-100 max-w-[700px] w-[95%] min-h-[500px] max-h-[90vh] px-4 py-2  mb-4 mt-16 shadow-lg overflow-scroll" > 
            <UndoRedo/>
            <Headers/>
        <div>
            <Button
                handleClick={handleClick}
                classes='bg-green-400 px-3 py-[2px] rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150'
            >
                add unit
            </Button>
            {test.units.map((unit: unit,index: number) => {
            const {id, questions, instructions, type, matchingUnit} = unit
            if (type === 'Matching') {
                return <MatchingQuestions 
                    key={id}
                    unitId={id}
                    instructions={instructions}
                    matchingUnit={matchingUnit}

                />
            }

            return (
                <Unit 
                    key={id}
                    id={id}
                    questions={questions}
                    instructions={instructions}
                    index={index}        
                    type={type}
                    matchingUnit={matchingUnit}                                     
                />                            
            )
            })}
        </div>
        </div>
  );
}
