import { useState } from "react"
import Template from "./Template"

const template = [
    {id: 123},
    {id: 456},
    {id: 789},
    {id: 322},
    {id: 644},
]

export default function Templates() {
    const [ selected, setSelected ] = useState(0)

    return (
        <div className="flex flex-col items-center justify-center">
            {template.map(t => {
                return (
                    <Template 
                        key={t.id}
                        id={t.id}
                        setSelected={setSelected}
                        selected={selected}
                    />
                )
            })}
        </div>
    )
}