import { motion, AnimatePresence } from "framer-motion";
import  { question, unitType, actions } from "../../types/types"

import Question from "../Question/Question"
import Button from "../Button/Button";

import { useGlobalContext } from "@/context/Context";

type QuestionsProps = {
    questions: question[]|undefined;
    index: number;
    id: string;    
    type: unitType;
}

export default function Questions({questions, index, id, type}: QuestionsProps) {
    const { History, dispatch, test, focus, setFocus } = useGlobalContext()
    
    function handleClick(id: string) {
        dispatch({type: actions.addQuestion, payload: {id}})
         History.add(test)
    }
    
    
    const unitId = id;
    return (
        <motion.div 
            layout
            transition={{layout: {duration:0.2, ease: 'linear'}}}
            className="my-4 bg-slate-200 dark:bg-slate-700 p-2 shadow-lg"
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
                className="font-semibold bg-green-300 dark:bg-green-700 my-2 ms-4 px-2 py-[2px] rounded-md shadow-lg drop-shadow-lg hover:scale-105 hover:bg-green-400 transition-all duration-150"
                onClick={() => handleClick(id)}
                data-testid="new-question"
            >
                new question
            </Button>
        </motion.div>
    )
}