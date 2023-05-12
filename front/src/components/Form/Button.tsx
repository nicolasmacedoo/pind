import { ButtonHTMLAttributes } from "react";
import { ButtonForm } from "./styles";
import { useFormContext } from "react-hook-form";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button(props: ButtonProps) {
  const { formState: { isSubmitting } } = useFormContext()

  return (
    <ButtonForm {...props} disabled={isSubmitting} />
  )
}