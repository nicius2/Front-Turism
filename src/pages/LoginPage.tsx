import { useState } from "react"
import welcomeImg from "../assets/welcome.svg"
import { Input } from "../components/Input"
import emailIcon from "../assets/emailIcon.svg"
import senhaIcon from "../assets/senhaIcon.svg"
import { Button } from "../components/Button"

export function LoginPage() {
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        console.log("Email:", email)
        console.log("Email:", senha)
    }

    return (
        <div className="h-screen w-screen bg-[url('/src/assets/background.svg')]
         bg-cover bg-no-repeat bg-center flex items-center justify-end pr-60">

            <div className="bg-white rounded-3xl shadow-2xl w-[430px]
             py-10 px-15 flex flex-col gap-8">
                <div className="flex items-center justify-center gap-2">
                    <h1 className="font-bold text-2xl">Bem-Vindo</h1>
                    <span><img src={welcomeImg} alt="mao de bem-vindo" className="w-8" /></span>
                </div>

                <div className="flex flex-col">
                    <form onSubmit={handleLogin} className="flex flex-col gap-8">
                        <Input
                            namePlaceholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<img src={emailIcon} alt="Senha" className="w-5 h-5" />}
                        />

                        <Input
                            namePlaceholder="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            icon={<img src={senhaIcon} alt="Senha" className="w-5 h-5" />}
                        />

                        <Button type="submit" title="Entrar" />
                    </form>
                </div>
            </div>
        </div>
    )
}