import type { ComponentProps, ReactNode } from "react"
import errorIcon from "../assets/circle-x.svg"

type Props = ComponentProps<"span"> & {
    children: ReactNode
}

export function TextError({ children, ...rest }: Props) {
    return (
        <span className="flex items-center gap-1 text-red-500 font-medium text-sm mt-1 " {...rest}>
            <img src={errorIcon} alt="icon Error" />
            {children}
        </span>
    )
}