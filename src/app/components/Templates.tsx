import { useState, Dispatch } from "react"
import type { test, action } from '../../types/types'


import Template from "./Template"

const template = [
    {id: 123, type: 'Multiple Choice',},
    {id: 456, type: 'Short Answer'},
    {id: 322, type: 'Matching'},
    {id: 789, type: 'True or False'},
    {id: 644, type: 'Essay'},
]

interface TemplatesProps {
    test: test;
    dispatch: Dispatch<action>
}

export default function Templates({test, dispatch} : TemplatesProps) {
    const [ selected, setSelected ] = useState(123)

    return (
        <div className="flex flex-col items-center justify-center max-h-[90vh] overflow-scroll">
            {template.map(t => {
                return (
                    <Template 
                        key={t.id}
                        id={t.id}
                        setSelected={setSelected}
                        selected={selected}
                        currentUnit={t.type}
                        dispatch={dispatch}
                    />
                )
            })}
        </div>
    )
}