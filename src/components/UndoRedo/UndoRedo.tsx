import { Dispatch } from 'react'
import type { TestHistory } from "../../utils/History"
import  { action, test, actions } from '../../types'
import { useGlobalContext } from '@/context/Context'

import Button from '../Button/Button'
import { useTranslation } from 'react-i18next'


export default function UndoRedo() {
    const { History, dispatch } = useGlobalContext()
    const {t} = useTranslation("data")

    function handleUndo(history: TestHistory<test>, dispatch: Dispatch<action>) {
        const undo = history.undo()
        dispatch({type: actions.undoAction, payload: {testData: undo}})
    }    

    return (        
        <div className="absolute top-2 right-2"
        data-testid="undo-redo"
        >
            <Button 
                className="border-2 border-gray-400 dark:border-gray-600 dark:text-white px-3 py-1 rounded-lg m-1 shadow-lg drop-shadow-lg hover:scale-105 actiove:scale-95 transition-all duration-150 disabled:opacity-50"
                onClick={() => handleUndo(History, dispatch)}
                disabled={!History.hasUndo()}
            >
                {t("undo")}
            </Button>
      </div>
    )
}