import { motion } from "framer-motion";
import { Dispatch, SetStateAction, MouseEvent } from "react"
import { useTranslation } from "react-i18next";


interface HotkeyModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>
}



export default function HotkeyModal({setShowModal}: HotkeyModalProps) {
    const {t} = useTranslation("data")

    function hideModal(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget === e.target) {
            setShowModal(false)            
        }
    }
    

    return (
        <motion.div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-10 " 
            exit={{opacity:0, transition: {duration:0.2}}}
            data-testid="hotkey-modal"
        >
            <div className="z-20 bg-black w-full h-full opacity-50 animate-in fade-in duration-500" onClick={hideModal} data-testid="hotkey-modal-background" />
            <motion.div 
                animate={{translateX: '-50%', translateY: '-50%', }}
                exit={{ scale:0}}
                className="flex flex-col px-8 py-8 fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 bg-slate-300 dark:bg-slate-700  w-[95%]  max-w-[500px] max-h-[400px] rounded-lg shadow-xl drop-shadow-xl"
            >
                <div className="mb-auto animate-in zoom-in-0 transition-all duration-300">
                    <p className="flex flex-row text-lg mb-aut border-b-2 border-gray-400">
                        <span className="me-auto font-bold text-green-700 dark:text-green-400">{t("add-unit")}</span>
                        <span className="font-semibold">CTRL + SHIFT + F</span>
                    </p>
                    <p className="flex flex-row text-lg border-b-2 border-gray-400">
                        <span className="me-auto font-bold text-green-700 dark:text-green-400">{t("add-question")}</span>
                        <span className="font-semibold">CTRL + SHIFT + L</span>
                    </p>
                    <p className="flex flex-row text-lg border-b-2 border-gray-400">
                        <span className="me-auto font-bold text-green-700 dark:text-green-400">{t("add-choice")}</span>
                        <span className="font-semibold">CTRL + SHIFT + S</span>
                    </p>
                    <p className="flex flex-row text-lg border-b-2 border-gray-400">
                        <span className="me-auto font-bold text-gray-700 dark:text-gray-300">{t("undo")}</span>
                        <span className="font-semibold">CTRL + SHIFT + U</span>
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        onClick={(e) => hideModal(e)}
                        className="mt-12 text-lg bg-red-400 dark:bg-red-700 px-3 py-[2px] rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
                        data-testid="hotkey-modal-close"
                    >
                        {t("close")}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}