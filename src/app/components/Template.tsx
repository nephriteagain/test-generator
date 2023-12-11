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
        <div className={`dark:bg-slate-700 cursor-pointer mx-auto flex w-[18%] sm:w-[70%] aspect-square text-center justify-center shadow-md items-center hover:bg-blue-100 bg-gray-100 my-2 rounded-md border-4 ${selected === id ? 'border-blue-800' : 'border-transparent'}  transition-all duration-100`}
            // draggable
            // onDragStart={() => console.log('dragging')}
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