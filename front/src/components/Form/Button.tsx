import { ButtonHTMLAttributes } from "react";
import { ButtonForm } from "./styles";
import { useFormContext } from "react-hook-form";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { formState: { isSubmitting } } = useFormContext()
  return (
    <ButtonForm {...props} disabled={isSubmitting}/>
  )
}