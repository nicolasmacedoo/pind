import styled from 'styled-components'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const ItemContainer = styled.main`
  width: 100%;
  max-width: 1576px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
  color: ${(props) => props.theme.color['gray-100']};
`

export const FormContainer = styled.form`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TableContent = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;
`

export const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  background: ${(props) => props.theme.color['gray-700']};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${(props) => props.theme.color['gray-300']};

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme.color['green-300']
        : props.theme.color['red-500']};
  }

  &[data-state='unchecked']:hover {
    transition: background-color 0.2s;
    background: ${(props) => props.theme.color['gray-500']};
  }

  &[data-state='checked'] {
    color: ${(props) => props.theme.color.white};
    background: ${(props) =>
      props.variant === 'income'
        ? props.theme.color['green-700']
        : props.theme.color['red-700']};

    svg {
      color: ${(props) => props.theme.color.white};
    }
  }
`

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme.color['green-300']
      : props.theme.color['red-500']};
`
