import z from "zod";

export const emailSchema = z.string().email("Email invalido")
export const senhaSchema = z.string().min(6, "A senha deve ter no mínimo 6 caracteres")

// Schema para login
export const loginSchema = z.object({
    email: emailSchema,
    senha: senhaSchema
})

// Schema para cadastro
export const cadastroSchema = z.object({
    nome: z.string().min(2, "O nome deve ter no minimo 2 caracteres"),
    email: emailSchema,
    senha: senhaSchema,
    confirmarSenha: z.string()
}).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"] // define em qual campo mostra o erro
})

// Derivações do Schema
export type LoginData = z.infer<typeof loginSchema>
export type CadastroData = z.infer<typeof cadastroSchema>