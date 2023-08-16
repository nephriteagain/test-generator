
import { useGlobalContext } from '@/context/Context';

import Templates from "./components/Templates"


export default function Side() {
    const { test, dispatch } = useGlobalContext()

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