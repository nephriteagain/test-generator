import { Dispatch } from 'react'
import type { TestHistory } from "../History"
import type { action, test } from '../types'

import { History } from '../page'

type UndoRedoProps = {
    dispatch: Dispatch<action>
}

export default function UndoRedo({dispatch}: UndoRedoProps) {

    function handleUndo(history: TestHistory<test>, dispatch: Dispatch<action>) {
        const undo = history.undo()
        dispatch({type: 'undo_action', payload: {testData: undo}})
      }
    
    //   function handleRedo(history: TestHistory, dispatch: Dispatch<action>) {
    //     const redo = history.redo()
    //     dispatch({type: 'redo_action', payload: {testData: redo}})
    //   }
    

    return (
        <div className="">
            <button onClick={() => handleUndo(History, dispatch)}
            className="bg-gray-700 text-white px-3 py-1 rounded-lg m-1 shadow-lg drop-shadow-lg hover:scale-105 actiove:scale-95 transition-all duration-150 disabled:opacity-50"
            disabled={!History.hasUndo()}
            >
            undo
            </button>
            {/* <button onClick={() => handleRedo(History, dispatch)}        
            className="bg-gray-700 text-white px-3 py-1 rounded-lg m-1 shadow-lg drop-shadow-lg hover:scale-105 actiove:scale-95 transition-all duration-150 disabled:opacity-50"
            disabled={!History.hasRedo()}
            >
            redo
            </button> */}
      </div>
    )
}