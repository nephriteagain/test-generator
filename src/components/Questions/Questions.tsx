import { motion, AnimatePresence } from "framer-motion";
import  { question, unitType, actions } from "../../types"

import Question from "../Question/Question"
import Button from "../Button/Button";

import { useGlobalContext } from "@/context/Context";
import { useTranslation } from "react-i18next";

type QuestionsProps = {
    questions: question[]|undefined;
    index: number;
    id: string;    
    type: unitType;
}

export default function Questions({questions, index, id, type}: QuestionsProps) {
    const { History, dispatch, test, focus, setFocus } = useGlobalContext()
    const {t} = useTranslation("data")
    
    function handleClick(id: string) {
        dispatch({type: actions.addQuestion, payload: {id}})
         History.add(test)
    }
    
    
    const unitId = id;
    return (
        <motion.div 
            layout
            transition={{layout: {duration:0.2, ease: 'linear'}}}
            className="my-4 border-2 border-slate-200 dark:border-slate-700 p-2"
            data-testid="questions"
        >
            
            
            <motion.section
                layout
                transition={{layout: {duration:0.2, ease: 'linear'}}}
            >
                <AnimatePresence>
                {questions && questions.map((q: question, index: number) => {
                    const { id , question, choices} = q
                    return (
                        <motion.section key={id}
                            exit={{x:'-100%', transition: {duration:0.2}}}
                        >
                            <Question                             
                                question={question}
                                choices={choices}
                                index={index}
                                id={id}
                                unitId={unitId}
                                questionObj={q}
                                type={type}
                                />
                        </motion.section>
                    )
                })}
                </AnimatePresence>
            </motion.section>
            <Button 
                className="font-semibold border-2 border-green-300 dark:border-green-700 my-2 ms-4 px-2 py-[2px] rounded-md drop hover:scale-105 hover:border-green-400 transition-all duration-150"
                onClick={() => handleClick(id)}
                data-testid="new-question"
            >
                {t("new-question")}
            </Button>
        </motion.div>
    )
}