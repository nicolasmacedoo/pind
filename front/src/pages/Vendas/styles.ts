import styled from 'styled-components'

export const ItemContainer = styled.main`
  width: 100%;
  max-width: 1576px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
  color: ${(props) => props.theme.color['gray-100']};
`

export const TableContent = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;
`

export const FormContainer = styled.form`
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`
export const ActionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`

export const AddButton = styled.button`
  border: none;
  background: transparent;
  color: ${(props) => props.theme.color['green-500']};
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.color['green-300']};
  }
`

export const RemoveButton = styled.button`
  border: none;
  background: transparent;
  color: ${(props) => props.theme.color['red-500']};
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.color['red-700']};
  }
`

export const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 7rem 2rem;
  column-gap: 0.5rem;
  margin: 0.5rem 0;
`

export const SpanError = styled.span`
  margin-top: 0.25rem;
  color: #ef4444;
  font-size: 0.75rem;
  line-height: 1rem;
`

export const SelectField = styled.select`
  border-radius: 6px;
  border: 0;
  background: ${(props) => props.theme.color['gray-700']};
  color: ${(props) => props.theme.color['gray-300']};
  padding: 1rem;
  font-size: 1rem;
`
