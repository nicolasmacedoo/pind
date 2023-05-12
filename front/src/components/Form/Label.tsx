import { LabelHTMLAttributes } from "react"
import { LabelForm } from "./styles"

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <LabelForm {...props} />
  )
}