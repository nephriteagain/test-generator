import { ReactNode,} from 'react'

type ButtonProps = {
    handleClick?: (...args: any) => any;
    args?: any[]
    classes?: string;
    children?: ReactNode
    style?: Record<string,string>
    disabled?: boolean;
}

export default function Button({handleClick, args = [], classes = '',  children, style = {}, disabled = false}: ButtonProps) {
    function runFunc() {
        if (typeof handleClick === 'function') {
            handleClick(...args)
        }
    }


    return (
        <button
            className={classes}
            onClick={runFunc}
            style={style}
            disabled={disabled}
        >
            {children}
        </button>
    )
}