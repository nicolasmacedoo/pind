import { HTMLAttributes } from 'react'
import { FieldsForm } from './styles'

type FieldProps = HTMLAttributes<HTMLDivElement>

export function Field(props: FieldProps) {
  return <FieldsForm {...props} />
}
