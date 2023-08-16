import { Dispatch } from 'react'
import type { test, action } from '../types/types'

import Templates from "./components/Templates"

interface SideProps {
    test: test;
    dispatch: Dispatch<action>
}

export default function Side({ test, dispatch }: SideProps) {
    return (
        <aside className="w-[250px] bg-gray-200 mt-16 relative">
            <div className='absolute -top-8 left-0 bg-gray-600 text-white w-full py-1 text-center rounded-t-md'>
                Current Unit: <span>{test.currentUnit}</span>
            </div>
            <Templates 
                test={test}
                dispatch={dispatch}
            />
        </aside>
    )
}