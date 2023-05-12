import * as Dialog from '@radix-ui/react-dialog'
import { ClosedButton, Content, Overlay } from './styles'
import { X } from 'phosphor-react'
import { ReactNode, forwardRef, ForwardedRef } from 'react'

interface ItemsModalProps {
  title: string
  children: ReactNode
  handleClearModal: () => void
  isModalOpen: boolean
  setIsModalOpen: (value: boolean) => void
  //TODO: contexto para evitar props drilling?
}

// 

export const NewItemModal = forwardRef(
  (
    { title, children, handleClearModal, isModalOpen, setIsModalOpen }: ItemsModalProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
  
  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>  
      <Dialog.Portal>
        <Overlay />

        <Content onEscapeKeyDown={handleClearModal} onInteractOutside={handleClearModal} ref={ref}>
          <Dialog.Title>{title}</Dialog.Title>

          <ClosedButton>
            <X size={24} weight='bold'/>
          </ClosedButton>

          {children}

        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})