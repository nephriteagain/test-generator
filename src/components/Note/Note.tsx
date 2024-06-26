"use client"
import { useGlobalContext } from "@/context/Context"
import { IoClose } from "react-icons/io5";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Note() {
    const {showNote, setShowNote} = useGlobalContext()
    const [ isChecked, setIsChecked ] = useState(false)
    const {t} = useTranslation("data")

    if (!showNote || (localStorage?.getItem('never-show-note'))) {
        return null;
    }


    return (
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.3}}
            className="fixed top-16 left-1/2 -translate-x-1/2 min-w-[280px] p-4 min-h-[250px] bg-stone-200 dark:bg-stone-700 dark:text-white flex flex-col items-center justify-evenly rounded-lg gap-8 shadow-md"
            data-testid="note"
        >
            <p className="font-semibold text-lg text-center">
                {t("bug")}
            </p>
            <button className="absolute top-4 right-4 text-xl text-white dark bg-red-300 dark:bg-red-700  rounded-full p-1 hover:scale-110 transition-all duration-150"
                data-testid="button"
                onClick={() => {
                    setShowNote(false)
                    if (isChecked) {
                        localStorage?.setItem('never-show-note', 'never')
                    }
                }}
            >
                <IoClose />
            </button>
            <div className="flex flex-row gap-2 items-center justify-center text-lg ">
                { isChecked ? 
                    <ImCheckboxChecked onClick={() => setIsChecked(false)} className="fill-red-400 dark:fill-red-700" /> : 
                    <ImCheckboxUnchecked onClick={() => setIsChecked(true)} /> 
                }
                <p className="opacity-80">{t("dont-show")}</p>
            </div>
        </motion.div>
    )    
}