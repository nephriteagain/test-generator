import type { choice, action } from "../types"
import { Dispatch } from "react";


type ChoicesProps = {
    choices: choice[];
    unitId: string;
    questionId: string;
    dispatch: Dispatch<action>
}

export default function Choices({choices, unitId, questionId, dispatch}: ChoicesProps) {
    return (
        <div>
            <section>
                {choices.map((c, index: number) => {
                    const {id, choice} = c
                    return (
                        <div key={id}>
                            <input 
                                type="text" 
                                value={choice}
                                onChange={(e) => dispatch({
                                    type: 'edit_choice',
                                    payload: {
                                        unitId,
                                        questionId,
                                        choiceId: id,
                                        text: e.currentTarget.value
                                    }
                                })}
                            />
                            <button onClick={() => dispatch({
                                type: 'delete_choice',
                                payload: {
                                    unitId,
                                    questionId,
                                    choiceId: id
                                }
                            })}>
                                delete
                            </button>
                        </div>

                    )
                })}
            </section>
            <button onClick={() => dispatch({
                type: 'add_choice',
                payload: {
                    unitId,
                    questionId
                }
            })}>
                add choices
            </button>
        </div>
    )
}