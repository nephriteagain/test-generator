"use client"
import {useEffect, useState, KeyboardEvent, useRef, useLayoutEffect} from "react"

import { test, focus, actions, unitType } from "../types/types"


import Main from "./Main"
import Side from "./Side"
import Button from "./components/Button"
import HotkeyModal from "./components/HokeyModal"

import { TestAsDocX } from '@/docx/generateDocument'
import { useGlobalContext } from "@/context/Context"



export default function Home() {
  const {test, dispatch, focus,  History} = useGlobalContext()

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



  // TODO: make this work on different unit types
  function handleKeyUp(e: globalThis.KeyboardEvent) {
      e.stopPropagation()
      const { unit, question, type } = focusRef.current
      // undo previous action
      if (e.ctrlKey && e.shiftKey && (e.key === 'U'|| e.key === 'u')) {
        const undo = History.undo()
        dispatch({type: actions.undoAction, payload: {testData: undo}})
        return
      }
      // add a new unit to the test
      if (e.ctrlKey && e.shiftKey && (e.key === 'f'|| e.key === 'F')) {
        dispatch({type: actions.addUnit})
        History.add(test)
        return
      }
      if (type !== unitType.matching) {
        // add a new question to the unit being focused
        if (e.ctrlKey && e.shiftKey && (e.key === 'l' || e.key === 'L')) {
          dispatch({type: actions.addQuestion, payload: {id: unit}})
          History.add(test) 
          return
        }
        // add a new choice to the question being focused
        if (e.ctrlKey && e.shiftKey && (e.key === 'S'|| e.key === 's')) {
          dispatch({type: actions.addChoice, payload: {unitId: unit, questionId: question}})
          History.add(test)
          return
        }
      }
      if (type === unitType.matching) {
        if (e.ctrlKey && e.shiftKey && (e.key === 'l' || e.key === 'L')) {
          dispatch({type: actions.addMatchingQuestion, payload: {unitId: unit}})
          History.add(test)
          return
        }
        if (e.ctrlKey && e.shiftKey && (e.key === 'S'|| e.key === 's')) {
          dispatch({type: actions.addMatchingChoice, payload: {unitId: unit}})
          History.add(test)
          return
        }
      }
      
      
  }

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    return () => removeEventListener('keyup', handleKeyUp)
  }, [test])


  useEffect(() => {
    focusRef.current = focus
  }, [focus])


  return (
    <main className="mx-8 mt-4"
    >
      <div className="flex flex-col-reverse sm:flex-row items-start justify-center gap-4">        
        <Main />
        <Side />
      </div>

      {showModal && 
        <HotkeyModal setShowModal={setShowModal}
      />}
      
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
