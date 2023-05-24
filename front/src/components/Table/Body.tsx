import { TableHTMLAttributes } from 'react'

export function Body(props: TableHTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} />
}
