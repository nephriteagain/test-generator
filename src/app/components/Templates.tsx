import { useState, Dispatch } from "react"
import { test, action, unitType } from '../../types/types'

import { useGlobalContext } from "@/context/Context"
import Template from "./Template"

const template = [
    {id: 123, type: unitType.multipleChoice,},
    {id: 456, type: unitType.shortAnswer},
    {id: 322, type: unitType.matching},
    {id: 644, type: unitType.essay},
    // {id: 789, type: 'True or False'},
]


export default function Templates() {
    const [ selected, setSelected ] = useState(123)

    const { test } = useGlobalContext()

    return (
        <div className="bg-gray-200 flex sm:flex-col items-center justify-between sm:justify-center overflow-y-scroll rounded-t-md w-full sm:py-4">
            <div className='mx-auto flex flex-col w-[18%] sm:w-[70%] aspect-square text- justify-center items-center my-2 bg-gray-600 rounded-md shadow-md text-white py-1 text-center border-4 border-transparent'>
                <p className="text-gray-200 invisible w-0 h-0 sm:visible sm:w-auto sm:h-auto">Current Unit:</p>
                <p className="font-semibold">{test.currentUnit}</p>
            </div>
            {template.map(t => {
                return (
                    <Template 
                        key={t.id}
                        id={t.id}
                        setSelected={setSelected}
                        selected={selected}
                        unitType={t.type}
                    />
                )
            })}
        </div>
    )
}