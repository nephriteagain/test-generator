import { useTranslation } from "react-i18next";
import  {  actions } from "../../types";

import { useGlobalContext } from "@/context/Context";



export default function Headers() {        
    const {  test , dispatch } = useGlobalContext()
    const {t} = useTranslation("data")

    return (
        <div 
        className="my-4"
        data-testid="headers"
        >
            <input 
            placeholder={t("subject")}
            type='text' 
            value={test.subject} 
            name='subject' 
            onChange={(e) => {
                dispatch({
                    type: actions.changeSubject, payload: { subject: e.currentTarget.value }
                })
            }}
            className="font-bold bg-transparent text-lg block mb-2 px-2 w-[50%] border-2 border-gray-200 dark:border-gray-600"
            data-testid="input-subject"
            />
            
            <input 
            placeholder={t("author")}
            type='text' 
            value={test.author} 
            name='author' 
            onChange={(e) => dispatch({
                type: actions.changeName, payload: { name: e.currentTarget.value }
            })}
            className="font-semibold bg-transparent block mb-2 px-2 w-[50%] border-2 border-gray-200 dark:border-gray-600"
            data-testid="input-author"
            />           
        </div>
    )
}
