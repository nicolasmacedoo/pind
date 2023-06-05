import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { ReactNode } from 'react'
import {
  Button,
  ButtonsContainer,
  Content,
  Description,
  Overlay,
  Title,
} from './styles'

interface AlertDialogDeleteProps {
  itemId: string
  handleDelete: (itemId: string) => void
  children: ReactNode
}

export function AlertDialogDelete({
  children,
  handleDelete,
  itemId,
}: AlertDialogDeleteProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <Overlay />
        <Content>
          <Title>Tem certeza que deseja excluir?</Title>
          <Description>
            Essa ação não pode ser desfeita. O produto será excluído
            permanentemente.
          </Description>
          <ButtonsContainer>
            <AlertDialog.Action asChild>
              <Button variant="cancel">Cancelar</Button>
            </AlertDialog.Action>
            <AlertDialog.Action asChild>
              <Button variant="confirm" onClick={() => handleDelete(itemId)}>
                Sim, desejo excluir
              </Button>
            </AlertDialog.Action>
          </ButtonsContainer>
        </Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}
