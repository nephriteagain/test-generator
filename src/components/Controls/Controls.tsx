import { useTranslation } from "react-i18next"
import Button from "../Button/Button"
import Switch from "../Switch/Switch"

import type { test } from "@/types"
import { Dispatch, SetStateAction } from "react"

type ControlsProps = {
    downloadTextAsDocX: (test:test) => void,
    test:test,
    disabledBtn: boolean;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function Controls ({
    downloadTextAsDocX,
    test,
    disabledBtn,
    showModal,
    setShowModal,

}: ControlsProps ) {
    const {t} = useTranslation("data")

    return (
        <div 
        className="px-4 py-2 fixed top-0 left-0 gap-4 w-screen flex flex-row items-center"
        data-testid="controls"

        >
            <Button 
            onClick={() => downloadTextAsDocX(test)}
            className="bg-blue-300 dark:bg-blue-600 px-2 py-[1px] rounded-md shadow-md hover:scale-105 hover:bg-blue-400 active:scale-95 transition-all duration-100 disabled:opacity-50"
            disabled={disabledBtn}
            data-testid="download"
            >
            {t("download")}
            </Button>
            <Switch />
            <Button
            onClick={() => setShowModal(!showModal)}
            className="ms-auto bg-blue-300 dark:bg-blue-600 px-2 py-[2px] rounded-md shadow-md hover:scale-105 hover:bg-blue-400 active:scale-95 transition-all duration-100"
            data-testid="hotkeys-btn"
            >
            {t("hotkeys")}
            </Button>
      </div>)
}