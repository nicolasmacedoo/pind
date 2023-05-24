import { TableHTMLAttributes } from 'react'
import { TableData } from './styles'

export function Data(props: TableHTMLAttributes<HTMLTableCellElement>) {
  return <TableData {...props}></TableData>
}
