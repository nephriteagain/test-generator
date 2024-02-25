import { motion, AnimatePresence } from "framer-motion";
import  { unit, actions } from "../types";

import { useGlobalContext } from '@/context/Context';


import Headers from '../components/Headers';
import UndoRedo from '../components/UndoRedo';
import Unit from '../components/Unit';
import Button from '../components/Button';
import MatchingQuestions from "../components/MatchingQuestions";

export default function Main() {
    
    const { History, test, dispatch } = useGlobalContext()

    function handleClick() {
        dispatch({type: actions.addUnit})
        History.add(test)
    }

    return (        
        <motion.div
            layout
            transition={{layout: {duration:0.1, ease: 'linear'}}}
            className="relative bg-gray-100 dark:bg-gray-800 max-w-[700px] w-[95%] min-h-[600px] max-h-[90vh] px-4 py-2  mb-4 sm:mt-16 shadow-lg overflow-scroll"             
        > 
            <UndoRedo/>
            <Headers/>
            <motion.div 
                layout
                transition={{layout: {duration:0.1, ease: 'linear'}}}
            >
            <Button
                onClick={handleClick}
                className='bg-green-400 dark:bg-green-800 px-3 py-[2px] rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150'
                data-testid="add-unit"
            >
                add unit
            </Button>
            <AnimatePresence>

            {test.units.map((unit: unit,index: number) => {
            const {id, questions, instructions, type, matchingUnit} = unit
            if (type === 'Matching') {
                return <MatchingQuestions 
                    key={id}
                    unitId={id}
                    instructions={instructions}
                    matchingUnit={matchingUnit}
                    type={type}

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
            </AnimatePresence>
            { test.units.length !== 0 && <Button
                onClick={handleClick}
                className='bg-green-400 dark:bg-green-800 mt-4 px-3 py-[2px] rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150'                
            >
                add unit
            </Button>}
            </motion.div>
        </motion.div>
  );
}
