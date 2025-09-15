import { useState } from "react"

import { AuthLayout } from "../components/AuthLayout"
import { Input } from "../components/Input"
import { TextError } from "../components/textError"


import cadastreIcon from "../assets/emojiCadastrese.svg"
import emailIcon from "../assets/emailIcon.svg"
import { cadastroSchema } from "../schemas/authSchemas"
import { processZodErrors } from "../utils/validationUtils"

export function RegisterPage() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [errors, setErrors] = useState<Record<string, string>>({})

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
                className="flex flex-col gap-6">
                <div>
                    <Input
                        namePlaceholder="Digite seu nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>


                <Input
                    namePlaceholder="Digite seu e-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<img src={emailIcon} alt="Email" className="w-5 h-5" />}
                />

                <Input
                    namePlaceholder="Digite sua senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <Input
                    namePlaceholder="Confirme a senha"
                    type="password"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />
            </form>
        </AuthLayout>
    )
}