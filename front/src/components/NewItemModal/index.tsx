import * as Dialog from '@radix-ui/react-dialog'
import { ClosedButton, Content, Overlay } from './styles'
import { X } from 'phosphor-react'
import { ReactNode } from 'react'

type ItemsModalProps = {
  title: string
  children: ReactNode
  handleAddItem: () => void
  //TODO: contexto para evitar props drilling?
}

export function NewItemModal({ title, children, handleAddItem }: ItemsModalProps) {
  
  return (
    <Dialog.Portal>
      <Overlay />

      <Content onEscapeKeyDown={handleAddItem} onInteractOutside={handleAddItem}>
        <Dialog.Title>{title}</Dialog.Title>

        <ClosedButton>
          <X size={24} weight='bold'/>
        </ClosedButton>

        {children}

      </Content>
    </Dialog.Portal>
  )
} 