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
        <div className="bg-gray-200 flex flex-col items-center justify-center overflow-y-scroll rounded-t-md w-full">
            <div className=' bg-gray-600 text-white w-full py-1 text-center rounded-t-md'>
                <p className="text-gray-200">Current Unit:</p>
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