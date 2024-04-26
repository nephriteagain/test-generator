import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChangeEvent } from 'react'

import { matchingUnit, actions, unitType,  } from "@/types";

import { checkScrollHeight } from "../../utils/helpers";
import { useGlobalContext } from '@/context/Context';

import { IoClose } from "react-icons/io5";

import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

interface MatchingQuestionsProps {
    unitId: string;
    instructions: string;
    matchingUnit: matchingUnit|undefined;
    type: unitType
}

export default function MatchingQuestions({unitId, instructions, matchingUnit, type}: MatchingQuestionsProps) {
    const { dispatch, History, test, setFocus } = useGlobalContext()
    const {t} = useTranslation("data")


    function handleChange(e: ChangeEvent<HTMLTextAreaElement>, id:string) {
        dispatch({
            type: actions.changeInstructions,
            payload: {id,instructions: e.currentTarget.value}
        })  
        checkScrollHeight(e)    
    }

    function handleChangeQuestion(e: ChangeEvent<HTMLTextAreaElement>, unitId:string, questionId: string) {
        dispatch({
            type: actions.editMatchingQuestion,
            payload: {
                text: e.currentTarget.value,
                unitId,
                questionId,
            }
        })
        checkScrollHeight(e)    
    }
    
    function handleChangeChoice(e: ChangeEvent<HTMLTextAreaElement>, unitId:string, choiceId: string) {
        dispatch({
            type: actions.editMatchingChoice,
            payload: {
                text: e.currentTarget.value,
                unitId,
                choiceId,
            }
        })
        checkScrollHeight(e)    
    }
    
    function handleAddQuestion(unitId: string) {
        dispatch({
            type: actions.addMatchingQuestion,
            payload: {
                unitId
            }
        })
        History.add(test)
    }

    function handleAddChoice(unitId: string) {
        dispatch({
            type: actions.addMatchingChoice,
            payload: {
                unitId
            }
        })
        History.add(test)
    }

    function handleDeleteQuestion(unitId: string, questionId: string) {
        dispatch({
            type: actions.deleteMatchingQuestion,
            payload: {
                unitId,
                questionId
            }
        })
        History.add(test)
    }

    function handleDeleteChoice(unitId: string, choiceId: string) {
        dispatch({
            type: actions.deleteMatchingChoice,
            payload: {
                unitId,
                choiceId
            }
        })
        History.add(test)
    }

    function handleDeleteUnit(id:string) {
        dispatch({
            type: actions.deleteUnit,
            payload: {
                unitId: id
            }
        })
        History.add(test)
    }
    if (!matchingUnit) return null
     return (
        <motion.section
            layout
            transition={{layout: {duration:0.2, ease: 'linear'}}}
            exit={{opacity:0}}
            className='mt-4 border-zinc-200 dark:border-zinc-700 p-2 border-2 border-transparent focus-within:border-cyan-600 transition-all duration-200 animate-in fade-in'
            onFocus={() => setFocus({unit:unitId, question: '', type: unitType.matching})}
            data-testid="matching-questions"
        >
            <textarea 
                className="border-2 border-gray-300 dark:border-gray-700 bg-transparent font-semibold  px-2 py-1 outline-none w-[90%] resize-none"                 
                placeholder={t("instructions")}
                rows={1}
                value={instructions}
                name={`unit-${unitId}`}
                onChange={(e) => handleChange(e,unitId)}
            />
            <motion.div 
                className='flex flex-row gap-6 my-4 border-slate-200 dark:border-slate-700 p-2'
                layout
                transition={{layout: {duration:0.2, ease: 'linear'}}}
            >
                <div className='basis-3/5'>

                    <AnimatePresence>

                    {matchingUnit.questions.map(q => {
                        const { id, item:question } = q
                        return (
                            <motion.div 
                                exit={{x:'-200%', opacity:0}}
                                className='flex flex-row items-center justify-center my-2 transition-all duration-200 cursor-pointer relative animate-in slide-in-from-left'
                                key={id}
                            >
                                <textarea 
                                    className="border-2 border-gray-300 dark:border-gray-700 me-2 font-semibold  px-2 py-1 outline-none w-[90%] resize-none bg-transparent"  
                                    value={question}
                                    rows={1}
                                    onChange={(e) => handleChangeQuestion(e, unitId, id)}
                                    data-testid="matching-question-textarea"
                                />
                                <Button
                                        className="border-2 text-red-400 dark:text-red-700 border-red-400 dark:border-red-700 p-1 aspect-square rounded-full hover:bg-red-300 dark:hover:bg-red-950  hover:scale-105 active:scale-95 transition-all duration-150"    
                                        onClick={() => handleDeleteQuestion(unitId, id)}
                                        data-testid="delete-matching-question"
                                    >
                                        <IoClose   />
                                </Button>
                            </motion.div>
                        )
                    })}
                    </AnimatePresence>

                    <Button 
                        className="font-semibold border-2 border-green-300 dark:border-green-600 my-2 ms-4 px-2 py-[2px] rounded-md drop hover:scale-105 hover:border-green-400 transition-all duration-150"
                        onClick={() => handleAddQuestion(unitId)}
                        data-testid="new-matching-question"
                    >
                        {t("new-question")}
                    </Button>
                </div>
                <div className='basis-2/5'>
                    <AnimatePresence>

                    {matchingUnit.choices.map(c => {
                        const { id, item:choice } = c
                        return (
                            <motion.div 
                                exit={{y:'-200%', opacity:0}}
                                className='flex flex-row items-center justify-center my-2 transition-all duration-100 cursor-pointer relative animate-in slide-in-from-top'
                                key={id}                            
                            >
                                <textarea 
                                    className="bg-transparent border-2 border-gray-300 dark:border-gray-700 me-2 font-semibold  px-2 py-1 outline-none w-[90%] resize-none"                 
                                    value={choice}
                                    rows={1}
                                    onChange={(e) => handleChangeChoice(e, unitId, id)}
                                    data-testid="matching-choice-textarea"
                                />
                                <Button
                                    className="border-2 text-red-400 dark:text-red-700  border-red-400 dark:border-red-700 px-1 aspect-square rounded-full  hover:bg-red-300 dark:hover:bg-red-950  hover:scale-105 active:scale-95 transition-all duration-150"
                                    onClick={() => handleDeleteChoice(unitId, id)}
                                    data-testid="delete-matching-choice"
                                >
                                    <IoClose  />
                                </Button>
                            </motion.div>
                        )
                    })}
                    </AnimatePresence>
                    <Button 
                        className="border-2 font-semibold border-blue-300 dark:border-blue-600 px-2 py-[2px] ms-6 mt-3 rounded-md hover:scale-105 hover:border-blue-400 active:scale-95 transition-all duration-150"
                        onClick={() => handleAddChoice(unitId)}
                        data-testid="new-matching-choice"
                    >
                        {t("add-choice")}
                    </Button>
                </div>
            </motion.div>
            <div className='flex'>
                <Button 
                    className='border-2 border-red-400 dark:border-red-700 ms-auto px-2 py-[1px] text-sm rounded-md hover:scale-105 hover:border-red-400 active:scale-95 transition-all duration-150'
                    onClick={() => handleDeleteUnit(unitId)}
                    >
                    {t("delete-unit")}
                </Button>
            </div>
            {/**Note: this is for testing purposes */}
            <div className='hidden' data-testid={type} />
        </motion.section>
    )
}