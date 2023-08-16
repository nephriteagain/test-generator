"use client"

import type { test, focus, action } from '@/types/types'
import { TestHistory } from '@/app/History'
import { useContext, createContext, useReducer, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import Reducer from '../reducers/testReducer'


const initial : test = {
    subject : '',
    author : '',
    units: [],
    currentUnit: 'Multiple Choice'
  }
  
const testInit: test = {
subject: 'Math',
author: 'Jade Lazo',
units: [
    {
    type: 'Multiple Choice',
    id: 'asdasd',
    instructions: 'Fill in the blanks',
    questions: [
        {
        id: 'asdadasdzsadasd',
        question: 'Who was in Paris?',
        choices: [
            {
            id: 'ascdasdasd',
            choice: 'Kanye West'
            },
            {
            id: 'asdasadasd',
            choice: 'Kanye West'
            },
            {
            id: 'asdajsdasd',
            choice: 'Kanye West'
            },
        ]
        }
    ]
    },
    {
    type: 'Multiple Choice',
    id: 'asidasd',
    instructions: 'Fill in the blanks',
    questions: [
        {
        id: 'asdadasjddsadasd',
        question: 'Who was in Paris?',
        choices: [
            {
            id: 'asda3sdasd',
            choice: 'Kanye West'
            },
            {
            id: 'asda7sdasd',
            choice: 'Kanye West'
            },
            {
            id: 'asdas1dasd',
            choice: 'Kanye West'
            },
        ]
        }
    ]
    },
    {
    type: 'Multiple Choice',
    id: 'asd0asd',
    instructions: 'Fill in the blanks',
    questions: [
        {
        id: 'asdad99asddsadasd',
        question: 'Who was in Paris?',
        choices: [
            {
            id: 'asda88sdasd',
            choice: 'Kanye West'
            },
            {
            id: 'as77dasdasd',
            choice: 'Kanye West'
            },
            {
            id: 'as12dasdasd',
            choice: 'Kanye West'
            },
        ]
        }
    ]
    }
],
currentUnit: 'Multiple Choice'
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