"use client"
import { useGlobalContext } from "@/context/Context"
import { IoClose } from "react-icons/io5";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Note() {
    const {showNote, setShowNote} = useGlobalContext()
    const [ isChecked, setIsChecked ] = useState(false)

    if (!showNote || (window?.localStorage?.getItem('never-show-note'))) {
        return null;
    }


    return (
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.3}}
            className="fixed top-16 left-1/2 -translate-x-1/2 min-w-[280px] p-4 min-h-[250px] bg-stone-200 dark:bg-stone-700 dark:text-white flex flex-col items-center justify-evenly rounded-lg gap-8 shadow-md"
        >
            <p className="font-semibold text-lg text-center">
                Bug Alert, docx library is broken, opening directly at Microsoft word is bugged, to use this, you must open the document first at wordpad then copy paste to MS Word
            </p>
            <button className="absolute top-4 right-4 text-xl text-white dark bg-red-300 dark:bg-red-700  rounded-full p-1 hover:scale-110 transition-all duration-150"
                onClick={() => {
                    setShowNote(false)
                    if (isChecked) {
                        localStorage.setItem('never-show-note', 'never')
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
                <p className="opacity-80">dont show this again</p>
            </div>
        </motion.div>
    )    
}