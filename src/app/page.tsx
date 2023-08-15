"use client"
import { useReducer, Dispatch, useEffect, useState } from "react"
import Reducer from './reducers/testReducer'
import { test } from "./types"
import { TestHistory } from "./History"

import Main from "./Main"
import Side from "./Side"
import Button from "./components/Button"
import { TestAsDocX } from '@/docx/generateDocument'

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

// TODO add history at onchange events
export const History = new TestHistory<test>(100)


export default function Home() {
  const [test, dispatch] = useReducer(Reducer, testInit)

  function downloadTextAsDocX(test: test) {
    const document = new TestAsDocX(test)
    document.download()
  }


  return (
    <main className="mx-8">
      <div className="flex justify-center gap-4">        
        <Main 
          test={test}
          dispatch={dispatch}
        />
        <Side 
          test={test}
          dispatch={dispatch}
        />
      </div>
      <Button 
        handleClick={downloadTextAsDocX}
        args={[test]}
        classes="absolute top-2 left-2 bg-blue-300 px-2 py-[1px] rounded-md shadow-md hover:scale-105 hover:bg-blue-400 active:scale-95 transition-all duration-100"
      >
        Download as Word File
      </Button>
    </main>
  )
}
