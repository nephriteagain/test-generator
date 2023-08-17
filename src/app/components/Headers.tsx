import  {  actions } from "../../types/types";

import { useGlobalContext } from "@/context/Context";



export default function Headers() {        
    const {  test , dispatch } = useGlobalContext()

    return (
        <div className="my-4">
            <input 
            placeholder="SUBJECT..."
            type='text' 
            value={test.subject} 
            name='subject' 
            onChange={(e) => {
                dispatch({
                    type: actions.changeSubject, payload: { subject: e.currentTarget.value }
                })
            }}
            className="font-bold text-lg block mb-2 px-2 w-[50%] shadow-sm"
            />
            
            <input 
            placeholder="AUTHOR..."
            type='text' 
            value={test.author} 
            name='author' 
            onChange={(e) => dispatch({
                type: actions.changeName, payload: { name: e.currentTarget.value }
            })}
            className="font-semibold block mb-2 px-2 w-[50%] shadow-sm"
            />           
        </div>
    )
}
