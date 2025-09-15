import type { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode,
    title: string,
    img: string
}

export function AuthLayout({ title, img, children }: AuthLayoutProps) {
    return (
        <div className="h-screen w-screen bg-[url('/src/assets/background.svg')] 
        bg-cover bg-no-repeat bg-center flex items-center justify-end pr-60">

            <div className="bg-white rounded-3xl shadow-2xl w-[430px] py-10 px-15 flex flex-col gap-8">
                <div className="flex items-center justify-center gap-2">
                    <h1 className="font-bold text-2xl">{title}</h1>
                    <span><img src={img} alt="mao de bem-vindo" className="w-8" /></span>
                </div>
                {children}
            </div>
        </div>
    )
}