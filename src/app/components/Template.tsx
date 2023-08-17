import  { action, actions } from "../../types/types";
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
            draggable
            onDragStart={() => console.log('dragging')}
            onClick={() => {
                setSelected(id)                
                dispatch({type: actions.setUnit, payload: {unitType: currentUnit}})
            }}
            onDoubleClick={() => console.log('double clicked')}
        >
            {currentUnit}
        </div>
    )
}