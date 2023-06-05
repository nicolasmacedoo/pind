import styled, { keyframes } from 'styled-components'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

export const Overlay = styled(AlertDialog.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`
export const Content = styled(AlertDialog.Content)`
  background: ${(props) => props.theme.color['gray-600']};
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`

export const Title = styled(AlertDialog.Title)`
  margin: 0 0 1rem;
  color: ${(props) => props.theme.color['red-500']};
  font-size: 1.8rem;
  font-weight: bold;
`

export const Description = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  color: ${(props) => props.theme.color.white};
  font-size: 15px;
  line-height: 1.5;
`

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`
interface ActionsButtonProps {
  variant?: 'confirm' | 'cancel'
}

export const Button = styled.button<ActionsButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: bold;
  height: 35px;
  border: 0;
  background: ${(props) =>
    props.variant === 'confirm'
      ? props.theme.color['red-100']
      : props.theme.color['gray-100']};
  color: ${(props) =>
    props.variant === 'confirm'
      ? props.theme.color['red-600']
      : props.theme.color['gray-300']};

  &:hover {
    background: ${(props) =>
      props.variant === 'confirm'
        ? props.theme.color['red-200']
        : props.theme.color['gray-200']};
  }
`
