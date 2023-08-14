import { Dispatch, SetStateAction } from "react";

interface TemplateProps {
    id: number;
    setSelected: Dispatch<SetStateAction<number>>
    selected: number;
}

export default function Template({id, setSelected, selected}: TemplateProps) {
    return (
        <div className={`w-[70%] aspect-square bg-gray-100 my-2 border-4 ${selected === id ? 'border-blue-800' : 'border-transparent'}  transition-all duration-150`}
            onClick={() => setSelected(id)}
        >
            {id}
            template
        </div>
    )
}