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
  // TODO: contexto para evitar props drilling?
}

// eslint-disable-next-line react/display-name
export const NewItemModal = forwardRef(
  (
    {
      title,
      children,
      handleClearModal,
      isModalOpen,
      setIsModalOpen,
    }: ItemsModalProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Overlay />

          <Content
            onEscapeKeyDown={handleClearModal}
            onInteractOutside={handleClearModal}
            ref={ref}
          >
            <Dialog.Title>{title}</Dialog.Title>

            <ClosedButton onClick={handleClearModal}>
              <X size={24} weight="bold" />
            </ClosedButton>

            {children}
          </Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  },
)

// export function NewItemModal({ title, children, handleClearModal, isModalOpen, setIsModalOpen }: ItemsModalProps) {

//   return (
//         <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
//           <Dialog.Portal>
//             <Overlay />

//             <Content onEscapeKeyDown={handleClearModal} onInteractOutside={handleClearModal}>
//               <Dialog.Title>{title}</Dialog.Title>

//               <ClosedButton>
//                 <X size={24} weight='bold'/>
//               </ClosedButton>

//               {children}

//             </Content>
//           </Dialog.Portal>
//         </Dialog.Root>
//       )
// }
