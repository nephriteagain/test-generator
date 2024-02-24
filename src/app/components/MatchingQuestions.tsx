import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ChangeEvent } from 'react'

import { matchingUnit, actions, unitType,  } from "@/types/types";

import { checkScrollHeight } from "../helpers";
import { useGlobalContext } from '@/context/Context';

import { IoClose } from "react-icons/io5";

import Button from './Button';

interface MatchingQuestionsProps {
    unitId: string;
    instructions: string;
    matchingUnit: matchingUnit|undefined;
    type: unitType
}

export default function MatchingQuestions({unitId, instructions, matchingUnit, type}: MatchingQuestionsProps) {
    const { dispatch, History, test, setFocus } = useGlobalContext()


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

    if (matchingUnit) return (
        <motion.section
            layout
            transition={{layout: {duration:0.2, ease: 'linear'}}}
            exit={{opacity:0}}
            className='mt-4 bg-zinc-200 dark:bg-zinc-700 p-2 shadow-lg border-4 border-transparent focus-within:border-cyan-600 transition-all duration-200 animate-in fade-in'
            onFocus={() => setFocus({unit:unitId, question: '', type: unitType.matching})}
            data-testid="matching-questions"
        >
            <textarea 
                className="dark:bg-black font-semibold  px-2 py-1 outline-none w-[90%] resize-none shadow-md"                 
                placeholder="instructions"
                rows={1}
                value={instructions}
                name={`unit-${unitId}`}
                onChange={(e) => handleChange(e,unitId)}
            />
            <motion.div 
                className='flex flex-row gap-6 my-4 bg-slate-200 dark:bg-slate-700 p-2 shadow-lg'
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
                                    className="dark:bg-black me-2 font-semibold  px-2 py-1 outline-none w-[90%] resize-none shadow-md"                 
                                    value={question}
                                    rows={1}
                                    onChange={(e) => handleChangeQuestion(e, unitId, id)}
                                    data-testid="matching-question-textarea"
                                />
                                <Button
                                        className="bg-red-300 dark:bg-red-600 p-1 aspect-square rounded-full hover:bg-red-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 shadow-md drop-shadow-md"                                        
                                        handleClick={handleDeleteQuestion}
                                        args={[unitId, id]}
                                    >
                                        <IoClose  data-testid="delete-matching-question" />
                                </Button>
                            </motion.div>
                        )
                    })}
                    </AnimatePresence>

                    <Button 
                        className="font-semibold bg-green-300 dark:bg-green-600 my-2 ms-4 px-2 py-[2px] rounded-md shadow-lg drop-shadow-lg hover:scale-105 hover:bg-green-400 transition-all duration-150"
                        handleClick={handleAddQuestion}
                        args={[unitId]}
                        data-testid="new-matching-question"
                    >
                        new question
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
                                    className="dark:bg-black me-2 font-semibold  px-2 py-1 outline-none w-[90%] resize-none shadow-md"                 
                                    value={choice}
                                    rows={1}
                                    onChange={(e) => handleChangeChoice(e, unitId, id)}
                                />
                                <Button
                                    className="bg-red-300 dark:bg-red-600 px-1 aspect-square rounded-full hover:bg-red-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 shadow-md drop-shadow-md"
                                    handleClick={handleDeleteChoice}
                                    args={[unitId, id]}
                                >
                                    <IoClose />
                                </Button>
                            </motion.div>
                        )
                    })}
                    </AnimatePresence>
                    <Button 
                        className="font-semibold text-sm bg-blue-300 dark:bg-blue-600 px-2 py-[2px] ms-6 mt-3 rounded-md hover:scale-105 hover:bg-blue-400 active:scale-95 transition-all duration-150 shadow-md drop-shadow-md"
                        handleClick={handleAddChoice}
                        args={[unitId]}
                    >
                        add choice
                    </Button>
                </div>
            </motion.div>
            <div className='flex'>
                <Button 
                    className='bg-red-300 dark:bg-red-600 ms-auto px-2 py-[1px] text-sm rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-red-400 active:scale-95 transition-all duration-150'
                    handleClick={handleDeleteUnit}                    
                    args={[unitId]}
                    >
                    delete unit
                </Button>
            </div>
            {/**Note: this is for testing purposes */}
            <div className='hidden' data-testid={type} />
        </motion.section>
    )
    return null
}