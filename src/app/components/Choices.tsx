import type { choice } from "../types"
import type { action } from '../reducer';
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
                        <input 
                            key={id}
                            type="text" 
                            value={`${index+1} ${choice}`}
                        />
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