import  {  actions } from "../../types/types";
import { Dispatch, SetStateAction } from "react";

import { useGlobalContext } from "@/context/Context";

interface TemplateProps {
    id: number;
    setSelected: Dispatch<SetStateAction<number>>
    selected: number;
    unitType: string;
}

export default function Template({id, setSelected, selected, unitType}: TemplateProps) {
    const { dispatch, History, test} = useGlobalContext()

    function handleDoubleClick() {
        dispatch({type: actions.addUnit})
        History.add(test)
    }

    return (
        <div className={`w-[55%] aspect-square bg-gray-100 my-2 border-4 ${selected === id ? 'border-blue-800' : 'border-transparent'}  transition-all duration-100`}
            draggable
            onDragStart={() => console.log('dragging')}
            onClick={() => {
                setSelected(id)                
                dispatch({type: actions.setUnit, payload: {unitType}})
            }}
            onDoubleClick={handleDoubleClick}
        >
            {unitType}
        </div>
    )
}