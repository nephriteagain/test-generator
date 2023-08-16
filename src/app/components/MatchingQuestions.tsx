import { ChangeEvent } from 'react'

import { matchingUnit } from "@/types/types";

import { checkScrollHeight } from "../helpers";
import { useGlobalContext } from '@/context/Context';

interface MatchingQuestionsProps {
    unitId: string;
    instructions: string;
    matchingUnit: matchingUnit|undefined;
}

export default function MatchingQuestions({unitId, instructions, matchingUnit}: MatchingQuestionsProps) {    
    const { dispatch } = useGlobalContext()


    function handleChange(e: ChangeEvent<HTMLTextAreaElement>, id:string) {
        dispatch({
            type: 'change_instructions',
            payload: {id,instructions: e.currentTarget.value}
        })  
        checkScrollHeight(e)    
    }

    function handleChangeQuestion(e: ChangeEvent<HTMLTextAreaElement>, unitId:string, questionId: string) {
        dispatch({
            type: 'edit_matching_question',
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
            type: 'edit_matching_choice',
            payload: {
                text: e.currentTarget.value,
                unitId,
                choiceId,
            }
        })
        checkScrollHeight(e)    
    }


    if (matchingUnit) return (
        <section
            className='mt-4 bg-zinc-200 p-2 shadow-lg border-4 border-transparent focus-within:border-cyan-600 transition-all duration-100'
        >
            <div>
            <textarea 
                className="font-semibold  px-2 py-1 outline-none w-[90%] resize-none shadow-md"                 
                placeholder="instructions"
                rows={1}
                value={instructions}
                name={`unit-${unitId}`}
                onChange={(e) => handleChange(e,unitId)}
            />
                <div>
                    {matchingUnit.questions.map(q => {
                        const { id, item:question } = q
                        return (
                            <textarea key={id}
                                className="font-semibold  px-2 py-1 outline-none w-[90%] resize-none shadow-md"                 
                                value={question}
                                rows={1}
                                onChange={(e) => handleChangeQuestion(e, unitId, id)}
                            />
                        )
                    })}
                </div>
                <div>
                    {matchingUnit.choices.map(c => {
                        const { id, item:choice } = c
                        return (
                            <textarea key={id}
                                className="font-semibold  px-2 py-1 outline-none w-[90%] resize-none shadow-md"                 
                                value={choice}
                                rows={1}
                                onChange={(e) => handleChangeChoice(e, unitId, id)}
                            />
                        )
                    })}
                </div>
            </div>

        </section>
    )
    return null
}