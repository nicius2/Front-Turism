import { useState } from "react"
import { Link } from "react-router-dom"
import welcomeImg from "../assets/welcome.svg"
import { Input } from "../components/Input"
import { PasswordInput } from "../components/PasswordInput"
import emailIcon from "../assets/emailIcon.svg"
import { Button } from "../components/Button"
import { z } from "zod"

const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
})

export function LoginPage() {
    const [email, setEmail] = useState<string>("")
    const [senha, setSenha] = useState<string>("")
    const [errors, setErros] = useState<{ email?: string; senha?: string }>({})

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        const result = loginSchema.safeParse({ email, senha })

        if (!result.success) {
            // Transformando os erros do Zod em objetos
            const fieldErrors: { email?: string; senha?: string } = {}

            result.error.issues.forEach((error) => {
                const fieldName = error.path[0] as keyof typeof fieldErrors
                fieldErrors[fieldName] = error.message
            })

            setErros(fieldErrors)
            return
        }

        // Limpa os erros se a validação passou
        setErros({})

        // Aqui você pode prosseguir com o login
        console.log("Login válido:", result.data)
        // Exemplo: chamar API de login, redirecionar, etc.
    }

    return (
        <div className="h-screen w-screen bg-[url('/src/assets/background.svg')]
         bg-cover bg-no-repeat bg-center flex items-center justify-end pr-60">

            <div className="bg-white rounded-3xl shadow-2xl w-[430px]
             py-10 px-15 flex flex-col gap-8">
                <div className="flex items-center  justify-center gap-2">
                    <h1 className="font-bold text-2xl">Bem-Vindo</h1>
                    <span><img src={welcomeImg} alt="mao de bem-vindo" className="w-8" /></span>
                </div>

                <div className="flex flex-col">
                    <form onSubmit={handleLogin} className="flex flex-col gap-8">
                        <div>
                            <Input
                                namePlaceholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<img src={emailIcon} alt="Email" className="w-5 h-5" />}
                            />
                            {errors.email && (
                                <span className="text-red-500 font-medium text-sm mt-1 block">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div>
                            <PasswordInput
                                namePlaceholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            {errors.senha && (
                                <span className="text-red-500 font-medium text-sm mt-1 block">
                                    {errors.senha}
                                </span>
                            )}
                            <a href="">
                                <span className="text-xs flex mt-2 justify-end text-zinc-600 hover:text-amber-500 transition ease-linear">
                                    Esqueceu a Senha?
                                </span>
                            </a>
                        </div>

                        <Button type="submit" title="Entrar" />
                    </form>
                </div>

                <span className="text-zinc-600 flex mb-10 gap-1 text-xs items-center justify-center">Ainda não possui uma conta?
                    <Link to="/cadastro" className="font-bold text-zinc-700 hover:text-zinc-900 transition ease-linear">
                        Criar conta
                    </Link>
                </span>
            </div>
        </div>
    )
}