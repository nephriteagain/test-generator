import { useState, Dispatch } from "react"
import { test, action, unitType } from '../../types'
import { TbAbc } from "react-icons/tb";
import { MdShortText, MdOutlineArticle } from "react-icons/md";
import { GiChoice } from "react-icons/gi";

import { useGlobalContext } from "@/context/Context"
import Template from "../Template/Template"
import { useTranslation } from "react-i18next";

const template = [
    {id: 123, type: unitType.multipleChoice, icon: () => <TbAbc className="text-3xl" />},
    {id: 456, type: unitType.shortAnswer, icon: () => <MdShortText className="text-3xl" />},
    {id: 322, type: unitType.matching, icon: () => <GiChoice className="text-3xl" />},
    {id: 644, type: unitType.essay, icon: () => <MdOutlineArticle className="text-3xl" />},
    // {id: 789, type: 'True or False'},
]


export default function Templates() {
    const [ selected, setSelected ] = useState(123)
    const {t} = useTranslation("data")

    const { test } = useGlobalContext()

    const localeType : Record<unitType, unitType> = {
        "Multiple Choice" : t("multiple-choice"),
        "Short Answer" : t("short-answer"),
        "Matching": t("matching"),
        "Essay": t("essay")
    }

    return (
        <div 
        className="bg-gray-200 dark:bg-slate-950 flex sm:flex-col items-center justify-between sm:justify-center overflow-y-scroll rounded-t-md w-full sm:py-4"
        data-testid="templates"
        >
            <div className='text-sm mx-auto flex flex-col w-[18%] sm:w-[70%] aspect-square text- justify-center items-center my-2 bg-gray-600 rounded-md shadow-md text-white py-1 text-center border-4 border-transparent'>
                <p className="text-gray-200 invisible w-0 h-0 sm:visible sm:w-auto sm:h-auto">Selected:</p>
                <p className="font-semibold">{test.currentUnit}</p>
            </div>
            {template.map(t => {
                return (
                    <Template 
                        key={t.id}
                        id={t.id}
                        setSelected={setSelected}
                        selected={selected}
                        unitType={localeType[t.type]}
                        Icon={t.icon}
                    />
                )
            })}
        </div>
    )
}