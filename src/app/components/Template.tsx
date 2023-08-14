import type { action } from "../types";
import { Dispatch, SetStateAction } from "react";

interface TemplateProps {
    id: number;
    setSelected: Dispatch<SetStateAction<number>>
    selected: number;
    currentUnit: string;
    dispatch: Dispatch<action>
}

export default function Template({id, setSelected, selected, currentUnit, dispatch}: TemplateProps) {
    return (
        <div className={`w-[70%] aspect-square bg-gray-100 my-2 border-4 ${selected === id ? 'border-blue-800' : 'border-transparent'}  transition-all duration-100`}
            onClick={() => {
                setSelected(id)                
                dispatch({type: 'set_unit', payload: {unitType: currentUnit}})
            }}
        >
            {currentUnit}
        </div>
    )
}