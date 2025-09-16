// src/utils/validationUtils.ts
import { ZodError, type ZodType } from "zod"
import { useState } from "react"

/**
 * Função genérica para processar erros de validação do Zod
 * @param error - Erro do Zod
 * @returns Objeto com os erros organizados por campo
 */
export function processZodErrors(error: ZodError): Record<string, string> {
    const fieldErrors: Record<string, string> = {}

    error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string
        fieldErrors[fieldName] = issue.message
    })

    return fieldErrors
}

/**
 * Hook customizado para validação com Zod
 * @param schema - Schema do Zod para validação
 * @returns Função de validação e estado de erros
 */
export function useZodValidation<T>(schema: ZodType<T>) {
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validate = (data: unknown) => {
        const result = schema.safeParse(data)

        if (!result.success) {
            const fieldErrors = processZodErrors(result.error)
            setErrors(fieldErrors)
            return { success: false, errors: fieldErrors }
        }

        setErrors({})
        return { success: true, data: result.data }
    }

    const clearErrors = () => setErrors({})
    const clearFieldError = (field: string) => {
        setErrors(prev => {
            const { [field]: _, ...rest } = prev
            return rest
        })
    }

    return {
        errors,
        validate,
        clearErrors,
        clearFieldError,
        hasErrors: Object.keys(errors).length > 0
    }
}