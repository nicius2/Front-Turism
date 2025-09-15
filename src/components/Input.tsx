import type { ComponentProps, ReactNode } from "react"


type Props = ComponentProps<"input"> & {
    namePlaceholder: string
    icon?: ReactNode
}

export function Input({ namePlaceholder, icon, ...rest }: Props) {
    return (
        <div className="relative w-full">
            <input
                {...rest}
                placeholder={namePlaceholder}
                className={`border border-zinc-700 rounded-2xl w-full py-3 px-5
                    focus:outline-none focus:ring-0
                    ${icon ? "pr-12" : ""}`}
            />

            {icon && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {icon}
                </span>
            )}
        </div>
    )
}