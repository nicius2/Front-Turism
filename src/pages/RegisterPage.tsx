import { useState } from "react"
import { z } from "zod"

import { AuthLayout } from "../components/AuthLayout"
import { Input } from "../components/Input"
import { Link } from "react-router-dom"
import { TextError } from "../components/textError"
import { Button } from "../components/Button"

import cadastreIcon from "../assets/emojiCadastrese.svg"
import emailIcon from "../assets/emailIcon.svg"
import { cadastroSchema } from "../schemas/authSchemas"
import { processZodErrors } from "../utils/validationUtils"

// Pega o tipo do schema
type CadastroData = z.infer<typeof cadastroSchema>

// Cria as chaves possíveis de erro com Partial
type CadastroErrors = Partial<Record<keyof CadastroData, string>>

export function RegisterPage() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [errors, setErrors] = useState<CadastroErrors>({})

    function handleCadastro(e: React.FormEvent) {
        e.preventDefault()

        const result = cadastroSchema.safeParse({
            nome,
            email,
            senha,
            confirmarSenha,
        })

        if (!result.success) {
            const fieldErros = processZodErrors(result.error)
            setErrors(fieldErros)
            return
        }

        setErrors({})

        console.log("Cadastro valido", result.data)
    }

    return (
        <AuthLayout title="Cadastra-se" img={cadastreIcon}>
            <form onSubmit={handleCadastro}
                className="flex flex-col gap-4">
                <div>
                    <Input
                        namePlaceholder="Digite seu nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    {errors.nome && (
                        <TextError>{errors.nome}</TextError>
                    )}
                </div>

                <div>
                    <Input
                        namePlaceholder="Digite seu e-mail"
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
                    <Input
                        namePlaceholder="Digite sua senha"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    {errors.senha && (
                        <TextError>{errors.senha}</TextError>
                    )}
                </div>

                <div>
                    <Input
                        namePlaceholder="Confirme a senha"
                        type="password"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />

                    {errors.confirmarSenha && (
                        <TextError>{errors.confirmarSenha}</TextError>
                    )}
                </div>

                <Button type="submit" title="Cadastrar" />

                <span className="text-zinc-600 flex mb-10 gap-1 text-xs items-center justify-center">Já possui conta?
                    <Link to="/login" className="font-bold text-zinc-700 hover:text-zinc-900 transition ease-linear">
                        Fazer login
                    </Link>
                </span>
            </form>
        </AuthLayout>
    )
}