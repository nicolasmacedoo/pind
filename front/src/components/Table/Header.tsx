import { TableHTMLAttributes } from 'react'

export function Header(props: TableHTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} />
}
