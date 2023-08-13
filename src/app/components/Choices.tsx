import type { choice, action, test } from "../types"
import { Dispatch, ChangeEvent } from "react";

import { checkScrollHeight } from "../helpers";
import { History } from "../page";

import Button from "./Button";

type ChoicesProps = {
    choices: choice[];
    unitId: string;
    questionId: string;
    dispatch: Dispatch<action>;
    test: test;
}

export default function Choices({choices, unitId, questionId, dispatch, test}: ChoicesProps) {
    function handleDeleteChoice(id: string) {
        dispatch({
            type: 'delete_choice',
            payload: {
                unitId,
                questionId,
                choiceId: id
            }
        })
        History.add(test)
    }

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

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>, id: string) {
        dispatch({
            type: 'edit_choice',
            payload: {
                unitId,
                questionId,
                choiceId: id,
                text: e.currentTarget.value
            }
        })
        checkScrollHeight(e)
    }

    return (
        <div>
            <section>
                {choices.map((c, index: number) => {
                    const {id, choice} = c
                    return (
                        <div key={id}
                            className="flex flex-row items-center justify-center"
                        >
                            <textarea 
                                className="text-sm px-2 py-[1px] w-[80%] outline-none resize-none my-1 me-2 shadow-md"
                                rows={1}
                                value={choice}
                                onChange={(e) => handleChange(e, id)}
                            />
                            <Button
                                classes="bg-red-300 px-2 py-[1px] text-sm rounded-full hover:bg-red-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 shadow-md drop-shadow-md"
                                handleClick={handleDeleteChoice}
                                args={[id]}
                            >
                                X
                            </Button>
                        </div>

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