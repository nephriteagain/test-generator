import { ReactNode, ButtonHTMLAttributes } from 'react'
//TODO: fix this abomination of a component
type ButtonProps = {
    handleClick?: (...args: any) => any;
    args?: any[]
    classes?: string;
    children?: ReactNode
    style?: Record<string,string>
    disabled?: boolean;
} &  ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({handleClick, args = [], className = '',  children, style = {}, disabled = false, ...rest}: ButtonProps) {
    function runFunc() {
        if (typeof handleClick === 'function') {
            handleClick(...args)
        }
    }


    return (
        <button
            data-testid="button"
            className={className}
            onClick={runFunc}
            style={style}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}