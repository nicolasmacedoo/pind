import { TableHTMLAttributes } from "react";
import { TableRow } from "./styles";

export function Row(props: TableHTMLAttributes<HTMLTableRowElement>) {
  return (
    <TableRow {...props} />
  )
}