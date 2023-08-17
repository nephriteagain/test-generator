"use client"

import { test, focus, action, unitType } from '@/types/types'
import { TestHistory } from '@/app/History'
import { useContext, createContext, useReducer, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import Reducer from '../reducers/testReducer'


const initial : test = {
    subject : '',
    author : '',
    units: [],
    currentUnit: unitType.multipleChoice
  }
  


interface GlobalContextValue {
    test: test;
    dispatch: Dispatch<action>;
    focus: focus;
    setFocus: Dispatch<SetStateAction<focus>>
    History: TestHistory<test>
}

interface GlobalProviderProps {
    children: ReactNode
}

// TODO add history at onchange events
export const History = new TestHistory<test>(100)

const GlobalContext = createContext({} as GlobalContextValue)

export function GlobalProvider({children}: GlobalProviderProps) {

    const [ test, dispatch ] = useReducer(Reducer, initial)
    const [ focus, setFocus ] = useState<focus>({
        unit: '',
        question: ''        
      })

    return (
        <GlobalContext.Provider value={{
            test,
            focus,
            dispatch,
            setFocus,
            History,
        } as GlobalContextValue}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext)
}