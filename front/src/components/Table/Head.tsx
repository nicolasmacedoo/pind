import { TableHTMLAttributes } from 'react'
import { TableHead } from './styles'

export function Head(props: TableHTMLAttributes<HTMLHeadElement>) {
  return <TableHead {...props}></TableHead>
}
