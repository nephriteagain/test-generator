import  {  actions, unitType } from "../../types";
import { Dispatch, SetStateAction,  ElementType } from "react";

import { useGlobalContext } from "@/context/Context";

interface TemplateProps {
    id: number;
    setSelected: Dispatch<SetStateAction<number>>
    selected: number;
    unitType: unitType;
    Icon: ElementType
}

export default function Template({id, setSelected, selected, unitType, Icon}: TemplateProps) {
    const { dispatch, History, test} = useGlobalContext()

    function handleDoubleClick() {
        dispatch({type: actions.addUnit})
        History.add(test)
    }

    return (
        <div className={`bg-transparent cursor-pointer mx-auto flex flex-col gap-1 w-[18%] sm:w-[70%] aspect-square text-center justify-center shadow-md items-center hover:border-slate-300 dark:hover:border-slate-700 bg-gray-100 my-2 rounded-md border-4 
        ${selected === id ? 'border-slate-400 dark:border-slate-500' : 'border-slate-100 dark:border-slate-800 '}
          transition-all duration-100`}
            // draggable
            // onDragStart={() => console.log('dragging')}
            data-testid={`template-${unitType}`}
            onClick={() => {
                setSelected(id)                
                dispatch({type: actions.setUnit, payload: {unitType}})
            }}
            onDoubleClick={handleDoubleClick}
        >
            <Icon />
            <p className="text-sm">{unitType}</p>

            
        </div>
    )
}