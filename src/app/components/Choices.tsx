import type { choice, unitType} from "../../types/types"

import { useGlobalContext } from "@/context/Context";

import Button from "./Button";
import Choice from "./Choice";


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
            type: 'add_choice',
            payload: {
                unitId,
                questionId
            }
        })
        History.add(test)
    }


     if (type === 'Multiple Choice') return (
        <div>
            <section>
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
            </section>
            <Button 
                classes="text-sm bg-blue-300 px-2 py-[2px] ms-12 mt-3 rounded-md hover:scale-105 hover:bg-blue-400 active:scale-95 transition-all duration-150 shadow-md drop-shadow-md"
                handleClick={handleAddChoice}
                args={[unitId, questionId]}
            >
                add choices
            </Button>
        </div>
    )
    return null
}