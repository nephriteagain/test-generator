"use client"
import { useReducer, Dispatch, useEffect } from "react"
import Reducer from './reducers/testReducer'
import { test, action } from "./types"
import { TestHistory } from "./History"
import Main from "./Main"

const initial : test = {
  subject : '',
  author : '',
  units: []
}
// TODO add history at onchange events
export const History = new TestHistory(initial,100)



export default function Home() {
  const [test, dispatch] = useReducer(Reducer, initial)

  function handleUndo(history: TestHistory, dispatch: Dispatch<action>) {
    const undo = history.undo()
    dispatch({type: 'undo_action', payload: {testData: undo}})
  }

  function handleRedo(history: TestHistory, dispatch: Dispatch<action>) {
    const redo = history.redo()
    dispatch({type: 'redo_action', payload: {testData: redo}})
  }

  useEffect(() => {
    console.log(History.undoStack)
  }, [test])



  return (
    <main className="mx-8">
      <div className="">
        <button onClick={() => handleUndo(History, dispatch)}
          className="bg-gray-700 text-white px-3 py-1 rounded-lg m-1 shadow-lg drop-shadow-lg hover:scale-105 actiove:scale-95 transition-all duration-150 disabled:opacity-50"
          disabled={!History.hasUndo()}
        >
          undo
        </button>
        <button onClick={() => handleRedo(History, dispatch)}        
          className="bg-gray-700 text-white px-3 py-1 rounded-lg m-1 shadow-lg drop-shadow-lg hover:scale-105 actiove:scale-95 transition-all duration-150 disabled:opacity-50"
          disabled={!History.hasRedo()}
        >
          redo
        </button>
      </div>
      <Main 
        test={test}
        dispatch={dispatch}
      />
    </main>
  )
}
