import styled from "styled-components";

export const LabelForm =  styled.label`
  display: flex; 
  font-size: 0.875rem;
  line-height: 1.25rem; 
  justify-content: space-between; 
  align-items: center; 
`

export const InputForm = styled.input`
  border-radius: 6px;
  border: 0;
  background: ${props => props.theme.color['gray-700']};
  color: ${props => props.theme.color['gray-300']};
  padding: 1rem;

  &::placeholder {
    color: ${props => props.theme.color['gray-500']};
  }
`

export const FieldsForm = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 0.25rem; 
`

export const ErrorMessageForm = styled.span`
  margin-top: 0.25rem; 
  color: #EF4444; 
  font-size: 0.75rem;
  line-height: 1rem; 
`

export const ButtonForm = styled.button`
  height: 58px;
  border: 0;
  background: ${props => props.theme.color['green-700']};
  color: ${props => props.theme.color.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  margin-top: 1.5rem;
  cursor: pointer;

  &:disabled {
    background-color: red;
    opacity: 0.6;
    cursor: progress;
  }

  &:not(:disabled):hover {
    background: ${props => props.theme.color['green-500']};
    transition: background-color 0.2s;
  }
`