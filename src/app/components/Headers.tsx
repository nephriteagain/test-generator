import type { test } from "../types";
import type { action } from '../reducer';
import { Dispatch } from "react";

type HeaderProps = {
    test : test;
    dispatch : Dispatch<action>
}

export default function Headers({test, dispatch} : HeaderProps) {
    return (
        <div>
            <label htmlFor='subject' className="block">Subject
                <input 
                type='text' 
                value={test.subject} 
                name='subject' 
                onChange={(e) => dispatch({
                    type:'change_subject', payload: {name: e.currentTarget.value}
                })}
                className="block"
                />
            </label>
            <label htmlFor='author' className="block">Author
                <input 
                type='text' 
                value={test.author} 
                name='author' 
                onChange={(e) => dispatch({
                    type: 'change_name', payload: {subject: e.currentTarget.value}
                })}
                className="block"
                />      
            </label>      
        </div>
    )
}