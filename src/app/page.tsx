"use client"
import { useReducer, Dispatch, useEffect, useState, KeyboardEvent, useRef} from "react"
import Reducer from './reducers/testReducer'
import { test, focus } from "./types"
import { TestHistory } from "./History"

import Main from "./Main"
import Side from "./Side"
import Button from "./components/Button"
import HotkeyModal from "./components/HokeyModal"

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
  const [test, dispatch] = useReducer(Reducer, initial)
  const [ focus, setFocus ] = useState<focus>({
    unit: '',
    question: ''
  })
  

  const [ disabledBtn, setDisableBtn ] = useState(false)
  const [ showModal, setShowModal ] = useState(false)
  const focusRef = useRef(focus)

  function downloadTextAsDocX(test: test) {
    setDisableBtn(true);
    const document = new TestAsDocX(test);
    document.download();
    setTimeout(() => {
      setDisableBtn(false)
    }, 3000)
  }

  function handleKeyDown(e: KeyboardEvent, focus: focus) {
      e.stopPropagation()
      const { unit, question } = focusRef.current

      if (e.ctrlKey && e.shiftKey && (e.key === 'f'|| e.key === 'F')) {
        dispatch({type: 'add_unit'})
        return
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'l' || e.key === 'L')) {
        dispatch({type: 'add_question', payload: {id: unit}})
        return
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'S'|| e.key === 's')) {
        dispatch({type: 'add_choice', payload: {unitId: unit, questionId: question}})
        return
      }
      if (e.ctrlKey && e.shiftKey && (e.key === 'U'|| e.key === 'u')) {
        const undo = History.undo()
        dispatch({type: 'undo_action', payload: {testData: undo}})
        return
      }
  }



  useEffect(() => {
    focusRef.current = focus
  }, [focus])

  return (
    <main className="mx-8 mt-4"
      onKeyDown={(e) => handleKeyDown(e, focusRef.current)}
    >
      <div className="flex justify-center gap-4">        
        <Main 
          test={test}
          dispatch={dispatch}
          focus={focus}
          setFocus={setFocus}
        />
        <Side 
          test={test}
          dispatch={dispatch}
        />
      </div>
      {showModal && <HotkeyModal setShowModal={setShowModal}/>}
      <Button 
        handleClick={downloadTextAsDocX}
        args={[test]}
        classes="absolute top-2 left-2 bg-blue-300 px-2 py-[1px] rounded-md shadow-md hover:scale-105 hover:bg-blue-400 active:scale-95 transition-all duration-100 disabled:opacity-50"
        disabled={disabledBtn}
      >
        Download as Word File
      </Button>
      <Button
        handleClick={setShowModal}
        args={[showModal? false: true]}      
        classes="absolute top-2 right-2 bg-blue-300 px-2 py-[2px] rounded-md shadow-md hover:scale-105 hover:bg-blue-400 active:scale-95 transition-all duration-100"
      >
        Hotkeys
      </Button>
    </main>
  )
}
