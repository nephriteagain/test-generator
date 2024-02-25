"use client"

import { test, focus, action, unitType, actions } from '@/types/types'
import { TestHistory } from '@/utils/History'
import { useContext, createContext, useReducer, useState, ReactNode, Dispatch, SetStateAction , useEffect} from 'react'
import Reducer from '../reducers'
import Note from '@/components/Note'
import { AnimatePresence } from 'framer-motion'

export const initial : test = {
    subject : '',
    author : '',
    units: [],
    currentUnit: unitType.multipleChoice
  }
  

// for testing
export interface GlobalContextValue {
    test: test;
    dispatch: Dispatch<action>;
    focus: focus;
    setFocus: Dispatch<SetStateAction<focus>>
    History: TestHistory<test>
    showNote: boolean;
    setShowNote : Dispatch<SetStateAction<boolean>>
}

interface GlobalProviderProps {
    children: ReactNode
}

// TODO add history at onchange events
export const History = new TestHistory<test>(100)

const GlobalContext = createContext({} as GlobalContextValue)


let timeout : any
export function GlobalProvider({children}: GlobalProviderProps) {
    const [ test, dispatch ] = useReducer(Reducer, initial)
    const [ focus, setFocus ] = useState<focus>({
        unit: '',
        question: '',
        type: unitType.multipleChoice
    })
    const [ showNote, setShowNote ] = useState(false)

    // auto saves to localstorage incase of accidentally closing window
    useEffect(() => {
        clearInterval(timeout)
        timeout = setTimeout(() => {
            localStorage.setItem('current_test', JSON.stringify(test))
            console.log('saved')
        }, 1000)
    }, [test])

    useEffect(() => {
        dispatch({type: actions.checkLocalStorage})
    }, [])

    return (
        <GlobalContext.Provider value={{
            test,
            focus,
            dispatch,
            setFocus,
            History,
            showNote,
            setShowNote
        } as GlobalContextValue}>
            {children}
            <AnimatePresence>
                { showNote && <Note />}
            </AnimatePresence>
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext)
}