import { useState } from "react";
import { Input } from "./Input";

import senhaIcon from "../assets/senhaIcon.svg";
import SenhaOcultaIcon from "../assets/senhaOcultaIcon.svg";

interface PasswordInputProps {
    namePlaceholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
}

export function PasswordInput({
    namePlaceholder,
    value,
    onChange,
    icon,
    className,
    disabled,
    required,
    name,
    id
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return (
        <div className="relative">
            <Input
                namePlaceholder={namePlaceholder}
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                icon={icon}
                className={className}
                disabled={disabled}
                required={required}
                name={name}
                id={id}
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 
                focus:outline-none focus:ring-0 cursor-pointer focus:ring-opacity-50 rounded transition-colors duration-200"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                disabled={disabled}
            >
                {showPassword ? (
                    <img src={senhaIcon} alt="icone de mostrar senha" className="w-5 h-5" />
                ) : (
                    <img src={SenhaOcultaIcon} alt="icone de ocultar senha" className="w-5 h-5 " />
                )}
            </button>
        </div>
    );
}