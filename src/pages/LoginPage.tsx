import { useState } from "react"
import { Link } from "react-router-dom"
import { z } from "zod"

import welcomeImg from "../assets/welcome.svg"
import emailIcon from "../assets/emailIcon.svg"

import { Input } from "../components/Input"
import { PasswordInput } from "../components/PasswordInput"
import { Button } from "../components/Button"
import { AuthLayout } from "../components/AuthLayout"
import { TextError } from "../components/textError"

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
        <AuthLayout title="Bem-Vindo" img={welcomeImg}>

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
                            <TextError>{errors.email}</TextError>
                        )}
                    </div>
                    <div>
                        <PasswordInput
                            namePlaceholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        {errors.senha && (
                            <TextError>{errors.senha}</TextError>
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

        </AuthLayout >
    )
}