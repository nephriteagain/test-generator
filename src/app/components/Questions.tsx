
import type { question, unitType} from "../../types/types"

import Question from "./Question"
import Button from "./Button";

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
        dispatch({type: 'add_question', payload: {id}})
         History.add(test)
    }
    
    
    const unitId = id;
    return (
        <div className="my-4 bg-slate-200 p-2 shadow-lg">
            
            
            <section>
                {questions && questions.map((q: question, index: number) => {
                    // @ts-ignore
                    const { id , question, choices} = q
                    return (
                        <section key={id}>
                            <Question                             
                                question={question}
                                choices={choices}
                                index={index}
                                id={id}
                                unitId={unitId}
                                questionObj={q}
                                type={type}
                                />
                        </section>
                    )
                })}
            </section>
            <Button 
                classes="font-semibold bg-green-300 my-2 ms-4 px-2 py-[2px] rounded-md shadow-lg drop-shadow-lg hover:scale-105 hover:bg-green-400 transition-all duration-150"
                handleClick={handleClick}
                args={[id]}
            >
                new question
            </Button>
        </div>
    )
}