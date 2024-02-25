"use client"

import { useLayoutEffect, useState } from "react"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";


export default function Switch() {
    const [ mode, setMode ] = useState('light')

    useLayoutEffect(() => {
        const localMode = localStorage.getItem('mode')
        if (localMode === 'dark') {
            setMode(localMode)
        }
    },[])

    useLayoutEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('mode', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('mode', 'light')
        }
    }, [mode])



    return (
        <div 
        className="flex flex-col justify-center text-3xl"
        data-testid="mode"
        >
            <button onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}
            data-testid="switch-btn"
            >
                {
                mode === 'light' ?
                <MdOutlineLightMode className="dark:text-white" data-testid="light" />  :
                <MdOutlineDarkMode className="dark:text-white" data-testid="dark" />
                }
            </button>
        </div>
    )
}