import type { choice, action, test } from "../../types/types"
import { Dispatch } from "react";

import { useGlobalContext } from "@/context/Context";

import Button from "./Button";
import Choice from "./Choice";


type ChoicesProps = {
    choices: choice[];
    unitId: string;
    questionId: string;
    dispatch: Dispatch<action>;
    test: test;
}

export default function Choices({choices, unitId, questionId, dispatch, test}: ChoicesProps) {
    const { History } = useGlobalContext()

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


    return (
        <div>
            <section>
                { choices.map((c, index: number) => {
                    const {id, choice} = c
                    return (
                        <Choice 
                            key={id}
                            id={id}
                            choice={choice}
                            dispatch={dispatch}
                            unitId={unitId}
                            questionId={questionId}
                            test={test}
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
}