import type { test, action } from "../types";
import { Dispatch, useState} from "react";

import { History } from "../page";

type HeaderProps = {
    test : test;
    dispatch : Dispatch<action>
}


export default function Headers({test, dispatch} : HeaderProps) {        

    return (
        <div className="my-4">
            <input 
            placeholder="SUBJECT..."
            type='text' 
            value={test.subject} 
            name='subject' 
            onChange={(e) => {
                dispatch({
                    type: 'change_subject', payload: { subject: e.currentTarget.value }
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
                type: 'change_name', payload: { name: e.currentTarget.value }
            })}
            className="font-semibold block mb-2 px-2 w-[50%] shadow-sm"
            />           
        </div>
    )
}
