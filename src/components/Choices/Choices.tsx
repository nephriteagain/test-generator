import { motion, AnimatePresence } from "framer-motion";
import { choice, unitType, actions, } from "../../types"

import { useGlobalContext } from "@/context/Context";

import Button from "../Button/Button";
import Choice from "../Choice";
import Essay from "../Essay/Essay";
import { useTranslation } from "react-i18next";


type ChoicesProps = {
    choices: choice[]|undefined;
    unitId: string;
    questionId: string;
    type: unitType
}

export default function Choices({choices, unitId, questionId, type}: ChoicesProps) {
    const { History, dispatch, test } = useGlobalContext()
    const {t} = useTranslation("data")

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
                className="text-sm border-2 border-blue-300 dark:border-blue-600 px-2 py-[2px] ms-12 mt-3 rounded-md hover:scale-105 hover:border-blue-400 active:scale-95 transition-all duration-150"
                onClick={() => handleAddChoice(unitId, questionId)}
                data-testid="btn-add-choice"
            >
                {t("add-choice")}
            </Button>
        </motion.div>
    )
    return null
}