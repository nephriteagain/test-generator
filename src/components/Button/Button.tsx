import { ReactNode, ButtonHTMLAttributes } from 'react'
//TODO: fix this abomination of a component
type ButtonProps = {    
    classes?: string;
    children?: ReactNode
    style?: Record<string,string>
    disabled?: boolean;
} &  ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
    onClick,
    className = '',  
    children, 
    style = {}, 
    disabled = false, 
    ...rest
}: ButtonProps) {


    return (
        <button
            data-testid="button"
            className={className}
            onClick={onClick}
            style={style}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    )
}