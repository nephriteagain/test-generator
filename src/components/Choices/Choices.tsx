import { motion, AnimatePresence } from "framer-motion";
import { choice, unitType, actions, } from "../../types"

import { useGlobalContext } from "@/context/Context";

import Button from "../Button/Button";
import Choice from "../Choice";
import Essay from "../Essay/Essay";


type ChoicesProps = {
    choices: choice[]|undefined;
    unitId: string;
    questionId: string;
    type: unitType
}

export default function Choices({choices, unitId, questionId, type}: ChoicesProps) {
    const { History, dispatch, test } = useGlobalContext()

    function handleAddChoice(unitId: string, questionId: string) {
        dispatch({
            type: actions.addChoice,
            payload: {
                unitId,
                questionId
            }
        })
        History.add(test)
    }
    if (type === unitType.essay && choices) return (        
        <Essay/>
    )
    
    
     if (type === unitType.multipleChoice) return (
        <motion.div
            layout
            transition={{layout: {duration:0.2, ease: 'linear'}}}
            data-testid="choices"
        >
            <motion.section
                layout
                transition={{layout: {duration:0.2, ease: 'linear'}}}
            >
                <AnimatePresence>

                {/* for typescript */}
                { choices && choices.map((c, index: number) => {
                    const {id, choice} = c
                    return (
                        <Choice 
                            key={id}
                            id={id}
                            choice={choice}
                            unitId={unitId}
                            questionId={questionId}
                            index={index}
                        />

                    )
                })}
                </AnimatePresence>
            </motion.section>
            <Button 
                className="text-sm bg-blue-300 dark:bg-blue-600 px-2 py-[2px] ms-12 mt-3 rounded-md hover:scale-105 hover:bg-blue-400 active:scale-95 transition-all duration-150 shadow-md drop-shadow-md"
                onClick={() => handleAddChoice(unitId, questionId)}
                data-testid="btn-add-choice"
            >
                add choices
            </Button>
        </motion.div>
    )
    return null
}