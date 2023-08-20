import { Dispatch, SetStateAction, MouseEvent } from "react"


interface HotkeyModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>
}



export default function HotkeyModal({setShowModal}: HotkeyModalProps) {

    function hideModal(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget === e.target) {
            setShowModal(false)            
        }
    }
    

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-10" >
            <div className="z-20 bg-black w-full h-full opacity-50" onClick={hideModal}/>
            <div className="flex flex-col px-8 py-8 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 bg-slate-300  w-[95%]  max-w-[500px] max-h-[400px] rounded-lg shadow-xl drop-shadow-xl">
                <div className="mb-auto">
                    <p className="flex flex-row text-lg mb-aut border-b-2 border-gray-400">
                        <span className="me-auto font-bold text-green-700">add unit</span>
                        <span className="font-semibold">CTRL + SHIFT + F</span>
                    </p>
                    <p className="flex flex-row text-lg border-b-2 border-gray-400">
                        <span className="me-auto font-bold text-green-700">add question</span>
                        <span className="font-semibold">CTRL + SHIFT + L</span>
                    </p>
                    <p className="flex flex-row text-lg border-b-2 border-gray-400">
                        <span className="me-auto font-bold text-green-700">add choice</span>
                        <span className="font-semibold">CTRL + SHIFT + S</span>
                    </p>
                    <p className="flex flex-row text-lg border-b-2 border-gray-400">
                        <span className="me-auto font-bold text-gray-700">undo</span>
                        <span className="font-semibold">CTRL + SHIFT + U</span>
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        onClick={(e) => hideModal(e)}
                        className="mt-12 text-lg bg-red-400 px-3 py-[2px] rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
                    >
                        close
                    </button>
                </div>
            </div>
        </div>
    )
}