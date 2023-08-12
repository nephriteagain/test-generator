import { Dispatch } from 'react'
import type { TestHistory } from "../History"
import type { action, test } from '../types'

import { History } from '../page'

import Button from './Button'

type UndoRedoProps = {
    dispatch: Dispatch<action>
}

export default function UndoRedo({dispatch}: UndoRedoProps) {

    function handleUndo(history: TestHistory<test>, dispatch: Dispatch<action>) {
        const undo = history.undo()
        dispatch({type: 'undo_action', payload: {testData: undo}})
    }    

    return (
        <div className="absolute -top-12 right-0">
            <Button 
                classes="bg-gray-700 text-white px-3 py-1 rounded-lg m-1 shadow-lg drop-shadow-lg hover:scale-105 actiove:scale-95 transition-all duration-150 disabled:opacity-50"
                handleClick={handleUndo}
                args={[History, dispatch]}
                disabled={!History.hasUndo()}
            >
                undo
            </Button>
      </div>
    )
}