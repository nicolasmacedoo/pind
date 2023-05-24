import { useFormContext } from 'react-hook-form'
import { ErrorMessageForm } from './styles'

interface ErrorMessageProps {
  field: string
}

export function ErrorMessage({ field }: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext()

  const fieldError = errors[field]

  if (!fieldError) {
    return null
  }

  return <ErrorMessageForm>{fieldError.message?.toString()}</ErrorMessageForm>
}
