import type { ComponentProps } from "react"

type Props = ComponentProps<"button"> & {
    title: string
}

export function Button({ title, ...rest }: Props) {
    return (
        <button className="py-3 mt-4 bg-amber-500 text-white rounded-2xl
        font-semibold hover:bg-amber-500/80 transition ease-linear
        " {...rest}>
            {title}
        </button>
    )
}