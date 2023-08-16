import { Dispatch } from 'react'
import type { TestHistory } from "../History"
import type { action, test } from '../../types/types'
import { useGlobalContext } from '@/context/Context'

import Button from './Button'


export default function UndoRedo() {
    const { History, dispatch } = useGlobalContext()

    function handleUndo(history: TestHistory<test>, dispatch: Dispatch<action>) {
        const undo = history.undo()
        dispatch({type: 'undo_action', payload: {testData: undo}})
    }    

    return (        
        <div className="absolute top-2 right-2">
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